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
        require: true,
    },
    password: {
        type: String,
        minlength: 6,
        require: 6,
    }
}, {versionKey: false, timestamps: true})
