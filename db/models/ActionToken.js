const { Schema, model } = require('mongoose');

const { database_tables } = require('../../constants');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: database_tables.USER
    }
}, { timestamps: true });

module.exports = model(database_tables.ActionToken, ActionTokenSchema);
