const express = require('express')
const route = express.Router()
const client = require('../controller/client_controllers')
const jwt = require('../middlewares/jwt')


//get
route.get('/',(req,res)=>{
    res.render('client/index')
})
route.get('/signin',client.signin_get)
route.get('/signup',client.signup_get)
route.get('/profil',(req,res)=>{
    res.render('client/profil')
})



//post
route.post('/signin',client.signin,jwt.data_session,(req,res)=>{
    console.log(res.locals.user.nom)
    res.render('client/index')
})
route.post('/signup',client.signup)



module.exports = route