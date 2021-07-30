const express = require('express');
const app = express();
const Prof = require('../model/profesores');
const User = require('../model/user')
const verify = require('../middleware/verifyAccess');
const jwt = require('jsonwebtoken');

// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.

//=================== Home ===================
//Este home inicial es para todo el mundo en general, hayas o no iniciado secion
app.get('/', async (req,res)=>{
    var pr = await Prof.find(); 
    var data = req.cookies.token;
    console.log(data)
    console.log(pr); 
    res.render("home",{pr, data}); 
});

//Este index es para agregar/editar/eliminar tus comentarios
app.get('/index', verify, async (req,res)=>{
    var pr = await Prof.find({user_id: req.userId}); 
    var user = await User.findOne({_id: req.cookies.user_id});

    var data = req.userId;
    var isAdmin = user.admin

    console.log(pr); 
    res.render("index",{pr, data, isAdmin}); 
});


app.get('/deleteUser', verify, async (req,res)=>{
    var users = await User.find(); 
    var data = req.cookies.token;
    console.log(data)

    console.log(users); 
    res.render("deleteUser",{users, data}); 
});


//=================== Usuarios ===================
app.get('/login', function(req,res){
    res.render('login');
  })

app.post('/login', async function(req,res){
    
    var{username, password} = req.body;
    var user = await User.findOne({username:username});

    if(!user){

        console.log("El usuario no existe");
        res.redirect('/login');
        // return res.status(404).send("El usuario no existe");
    
      } else{
        
        var valid = await user.validatePassword(password);
    
        if (valid) {
    
          var token = jwt.sign({id: user.username, pemission:true}, process.env.SECRET, {expiresIn: "1h"});
          res.cookie("token", token, {httpOnly: true});
          res.cookie("user_id", user._id, {httpOnly: true});
          res.redirect("/");
        } else{
          console.log("Contraseña incorrecta");
          res.redirect("/login");
        }
      }
});

app.get('/register', function(req,res){
    res.render('register');
});

app.post('/addUser',async function(req,res){
  var user = new User(req.body);
  user.password = user.encryptPassword(user.password);

  //await user.save();
  user.save(function (err) {
    //mensaje de error en la terminal
    console.log(err);
  res.redirect('/login');
  })
});

app.get('/logoff',  async (req,res) =>{

    res.clearCookie("token");
    res.clearCookie("user_id");
    res.redirect("/");
});
  

//=============================================
app.get('/crea-profe', (req, res)=>{
    res.render("crea-profe")
}); 

app.post('/add', verify, async (req,res)=>{
    var pr = new Prof(req.body); 
    pr.user_id = req.userId;

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
    res.redirect('/index')
}); 



module.exports = app;