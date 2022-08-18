const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema  = new Schema({
    username: {
        type: String,
        required: true
    },
    EmailId: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    PasswordConf: {
        type: String,
        required: true
    },
    userType:{
        type: String,
        required: true
    },
    

},{ timestamp: true})

const User = mongoose.model('User',userSchema);
module.exports = User;
