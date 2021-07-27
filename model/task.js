const mongoose = require("mongoose");
var Schema = mongoose.Schema; 

var TaskSchema = Schema ({
    prof_name: String, 
    description: String, 
    grade:{
        type:int, 
        default:0
    }
}); 

module.exports = mongoose.model('tasks', TaskSchema); 