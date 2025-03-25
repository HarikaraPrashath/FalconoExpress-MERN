const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
    },
    password:{
        type: String,
    },
    role:{
        type: String,
    }
})

const AuthModel = mongoose.model('auth', AuthSchema);
module.exports = AuthModel;