const { Double } = require("bson");
const mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var TaskSchema = Schema ({
    prof_name: String, 
    description: String, 
    grade:{
        type: Number, // cambiar a number
        default:0
    }
}); 

module.exports = mongoose.model('tasks', TaskSchema); 