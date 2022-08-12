const express = require('express')
const route = express.Router()
const projet = require('../controller/projet_controllers')
const jwt = require('../middlewares/jwt')



//get
route.get('/',jwt.data_session,(req,res)=>{
    console.log(req.session.user)
    res.render('client/projet/index')
})
route.get('/modifier/:id',projet.modifier_get)
route.get('/supprimer/:id',projet.supprimer)
route.get('/start',jwt.data_session,projet.start)
route.get('/create',jwt.data_session,projet.create)
route.get('/create/recompense',(req,res)=>{
    res.render('client/projet/recompense')
})
route.get('/create/votre_histoire',(req,res)=>{
    res.render('client/projet/histoire')
})
route.get('/create/equipe',(req,res)=>{
    res.render('client/projet/equipe')
})
route.get('/create/fond',(req,res)=>{
    res.render('client/projet/fond')
})


//post 
route.post('/',projet.ajouter)
route.post('/ajoute/',projet.ajouter)
route.post('/modifier/:id',projet.modifier)





module.exports = route