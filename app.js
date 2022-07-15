const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const pays_routes = require('./routes/pays_routes')


 
//use
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


//moteur de vues
app.set('views','./views')
app.set('view engine','ejs')


//routage
app.use('/pays',pays_routes)



















app.listen(port,()=>{
})