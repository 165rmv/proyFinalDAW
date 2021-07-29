const express = require('express');
const app = express();
const Prof = require('../model/profesores');
const User = require('../model/user')


// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.

//=================== Home ===================
//Este home inicial es para todo el mundo en general, hayas o no iniciado secion
app.get('/', async (req,res)=>{
    var pr = await Prof.find(); 
    console.log(pr); 
    res.render("home",{pr}); 
});

//Este index es para agregar/editar/eliminar tus comentarios
app.get('/index', async (req,res)=>{
    var pr = await Prof.find(); 
    console.log(pr); 
    res.render("index",{pr}); 
});


//=================== Usuarios ===================
app.get('/login', function(req,res){
    res.render('login');
  })

app.get('/register', function(req,res){
    res.render('register');
})

app.post('/addUser',async function(req,res){
  var user = new User(req.body);
  user.password = user.encryptPassword(user.password);

  await user.save();
  res.redirect('/login');
})


//=============================================
app.get('/crea-profe', (req, res)=>{
    res.render("crea-profe")
}); 


app.post('/add', async (req,res)=>{
    var pr = new Prof(req.body); 
    //TODO: Falta agregar el verify-->middleware/verifyAccess
    //pr.user_id = req.userId;

    await pr.save(); 
    res.redirect('/'); 
}); 

// toma a profesor seleccionado y despliega su info en una página con ruta dinámica
app.get("/ve-profe/:id", async (req,res)=>{
    var id = req.params.id; 
    var pr = await Prof.findById(id); 
    res.render('ve-profe', {pr})
}); 


//delete de elemento en base de datos
app.get("/delete/:id", async (req,res)=>{
    var id = req.params.id; 
    await Prof.remove({_id: id});
    res.redirect("/");  
}); 

app.get("/edit/:id", async(req,res)=>{
    var id = req.params.id; 
    var pr = await Prof.findById(id);
    res.render('edit',{pr})
}); 

app.post('/edit/:id', async(req,res) =>{
    var id = req.params.id; //req.body
    await Prof.updateOne({_id: id}, req.body)
    res.redirect('/')
}); 



module.exports = app;