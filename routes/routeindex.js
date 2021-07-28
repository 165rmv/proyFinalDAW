const express = require('express');
const app = express();
const Prof = require('../model/profesores');


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
app.get('/', async function(req,res){
    var pr = await Prof.find(); 
    console.log(pr); 
    res.render("index",{pr}); 
});


// toma a profesor seleccionado y despliega su info en una página con ruta dinámica
app.get("/ve-profe/:id", async (req,res)=>{
    var id = req.params.id; 
    var pr = await pr.findById(id); 
    res.render('ve-profe', {pr})
}); 

app.get("/delete/:id", async (req,res)=>{
    var id = req.params.id; 
    await Prof.remove({_id: id});
    res.redirect("/");  
}); 

module.exports = app;