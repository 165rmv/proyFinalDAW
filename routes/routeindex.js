const express = require('express');
const app = express();
const Prof = require('../model/profesores');


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
app.get('/', async (req,res)=>{
    var pr = await Prof.find(); 
    console.log(pr); 
    res.render("index",{pr}); 
});

app.get('/crea-profe', (req, res)=>{
    res.render("crea-profe")
}); 


app.post('/add', (req,res)=>{
    var pr = new Prof(req.body); 
    pr.save(); 
    res.redirect('/'); 
}); 

// toma a profesor seleccionado y despliega su info en una página con ruta dinámica
app.get("/ve-profe/:id", async (req,res)=>{
    var id = req.params.id; 
    var pr = await pr.findById(id); 
    res.render('ve-profe', {pr})
}); 


//delete de elemento en base de datos
app.get("/delete/:id", async (req,res)=>{
    var id = req.params.id; 
    await Prof.remove({_id: id});
    res.redirect("/");  
}); 

module.exports = app;