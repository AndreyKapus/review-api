const {User} = require('../models/user/user');
const HttpError = require('../helpers/HttpError');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { ctrlWrapper } = require('../helpers');
const {nanoid} = require('nanoid');
const sendEmail = require('../helpers/sendEMail');

const verificationCode = nanoid()

const {SECRET_KEY, BASE_URL} = process.env

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, 'Email already in use')
    }

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

const verifyEmail = async (req, res) => {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});

    if(!user) {
        throw HttpError(401, "Email not found")
    };

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ''});

    res.redirect(process.env.CLIENT_URL)
};

const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, "Email not found")
    };

    if(user.verify) {
        throw HttpError(401, "Email is already verified")
    };

    const verifyEmail = {
        to: email, 
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify your email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Resend email: success"
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid")
    };

    if(!user.verify) {
        throw HttpError(401, "Email is not verified")
    }

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
        user: {
            name: user.name,
            email: user.email,
        },
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
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    verifyEmail: ctrlWrapper(verifyEmail),
};