const {User} = require('../models/user/user');
const HttpError = require('../helpers/HttpError');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../helpers');
const {nanoid} = require('nanoid');
const sendEmail = require('../helpers/sendEMail');

const {SECRET_KEY, BASE_URL} = process.env

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, 'Email already in use')
    }

    const verificationCode = nanoid()

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword, verificationCode});
    
    const verifyEmail = {
        to: email, 
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`
    };

    await sendEmail(verifyEmail);

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
    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
    });
};

const getCurrent = (req, res) => {
    const {name, email} = req.user;

    res.json({
        name,
        email,
    })
};

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "logout success"
    })
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout)
};