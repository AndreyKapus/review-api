const {Schema, model} = require('mongoose');
const Joi = require('joi');

const handleStatusError = require('../../helpers/handleStatusError');

const emailRegexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        minlength: 6,
        require: true,
    },
    token: {
        type: String,
        default: '',
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: "",
    }
}, {versionKey: false, timestamps: true});

userSchema.post('save', handleStatusError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}