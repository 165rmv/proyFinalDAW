var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')
var bcrypt = require("bcrypt");

var UserSchema = Schema ({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: String,
    admin:{
        type: Boolean,
        default: false    
    } 
});
UserSchema.plugin(uniqueValidator)

UserSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, 10) ;   
}

UserSchema.methods.validatePassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password) ;   
}

module.exports = mongoose.model('users', UserSchema);