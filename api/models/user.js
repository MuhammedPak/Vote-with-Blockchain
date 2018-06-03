const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    tc: String,
    password: String,
    voteStatus: { type: Boolean, default: false },
    cryptedVote: { type: String, default: null },
});
module.exports = mongoose.model('user', userSchema, 'users')