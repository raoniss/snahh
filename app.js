const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')

//les differentes routes 
const pays_routes = require('./routes/pays_routes')
const categorie_routes = require('./routes/categorie_routes')
const user_routes =  require('./routes/utilisateur_routes')
const projet_routes = require ('./routes/projet_routes')


 
//use
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.render('index')
})
//moteur de vues
app.set('views','./views')
app.set('view engine','ejs')


//routage
app.use('/pays',pays_routes)
app.use('/categorie',categorie_routes)
app.use('/user',user_routes)
app.use('/projet',projet_routes)



















app.listen(port,()=>{
})