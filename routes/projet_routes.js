const express = require('express')
const route = express.Router()
const projet = require('../controller/projet_controllers')



//get

route.get('/',projet.lister)
route.get('/modifier/:id',projet.modifier_get)
route.get('/supprimer/:id',projet.supprimer)



//post 
route.post('/',projet.ajouter)
route.post('/ajoute/',projet.ajouter)
route.post('/modifier/:id',projet.modifier)





module.exports = route