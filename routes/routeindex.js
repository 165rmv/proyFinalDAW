const express = require('express');
const app = express();
const Task = require('../model/task');


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
app.get('/', async function(req,res){
    res.render("index"); 
});


// toma a profesor seleccionado y despliega su info en una página con ruta dinámica
app.get("/ve-profe:profeSelec", async (req,res)=>{
    var chosen = req.params.profeSelec; 
    res.render("ve-profe")
}); 


module.exports = app;