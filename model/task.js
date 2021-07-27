const { Double } = require("bson");
const mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var TaskSchema = Schema ({
    prof_name: String, 
    description: String, 
    grade:{
        type: Boolean, // cambiar a number
        default:false
    }
}); 

module.exports = mongoose.model('tasks', TaskSchema); 