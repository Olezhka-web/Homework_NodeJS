const { Schema, model } = require('mongoose');

const { roles } = require('../../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: roles.USER,
        enum: Object.values(roles)
    }
}, { timestamps: true });

module.exports = model('user', userSchema);
