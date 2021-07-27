const { Double } = require("bson");
const mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var ProfSchema = Schema ({
    prof_name: String, 
    description: String, 
    grade:{
        type: Number, 
        default:0
    }
}); 

module.exports = mongoose.model('tasks', ProfSchema); 