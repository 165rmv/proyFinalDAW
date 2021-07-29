// const { Double } = require("bson");
var mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var ProfSchema = Schema ({
    prof_name: String, 
    description: String,
    materia: String, 
    grade:{
        type: Number, 
        default:0
    },
    user_id: String
}); 

module.exports = mongoose.model('pr', ProfSchema); 