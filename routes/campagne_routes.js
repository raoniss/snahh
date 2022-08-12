const express = require('express')
const route = express.Router()
const campagne = require('../controller/campagne_controllers')


//get
route.get('/',campagne.lister)
route.get('/supprimer/:id',campagne.supprimer)
route.get('/modifier/:id',campagne.modifier_get)



//post
route.post('/ajoute',campagne.ajouter)
route.post('/modifier/:id',campagne.modifier)



module.exports = route