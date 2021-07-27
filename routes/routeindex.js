const express = require('express');
const app = express();
const Task = require('../model/task');


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
app.get('/', async function(req,res){
    res.send("hola"); 
});


module.exports = app;