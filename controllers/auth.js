const {User} = require('../models/user/user');
const HttpError = require('../helpers/HttpError');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../helpers');

const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, 'Email already in use')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })
};

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid")
    };

    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password invalid")
}

    const payload = {
        id: user._id
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    res.json({
        token,
    });
};


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login)
};