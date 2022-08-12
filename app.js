const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require("cookie-parser")
const oneDay = 1000 * 60 * 60 * 24


//les differentes routes
const client_routes = require('./routes/client_routes') 
const pays_routes = require('./routes/pays_routes')
const categorie_routes = require('./routes/categorie_routes')
const user_routes =  require('./routes/utilisateur_routes')
const projet_routes = require('./routes/projet_routes')
const campagne_routes = require('./routes/campagne_routes')
const recompense_routes = require('./routes/recompense_routes')
const commentaire_routes = require ('./routes/commentaire_routes')


 
//use
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
/*app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));*/
app.use(session({ 
    secret: ',vklolf;,fdlfllk,fdlf;;;gf',
    resave: false, 
    cookie: { maxAge: oneDay },
    saveUninitialized: true, 
    unset: 'destroy', 
    name: 'session cookie name',
}));
app.use(require('./middlewares/flash'))
const jwt = require('./middlewares/jwt')


//get



//post


//moteur de vues
app.set('views','./views')
app.set('view engine','ejs')


//routage
app.get('/',jwt.data_session,(req,res)=>{
    res.render('client/index')
})
app.use('/',client_routes)
app.use('/pays',pays_routes)
app.use('/categorie',categorie_routes)
app.use('/user',user_routes)
app.use('/projet',projet_routes)
app.use('/campagne',campagne_routes)
app.use('/recompense',recompense_routes)
app.use('/commentaire',commentaire_routes)



















app.listen(port,()=>{
})