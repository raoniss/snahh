const conn = require('../config/db')
const Projet = require('../models/projet')
const Pays = require('../controller/pays_controllers')
const Categorie = require('../controller/categorie_controllers')



//ajout d;un projet
const ajouter = (req,res)=>{
    conn.query('INSERT INTO Projet (Pj_matricule,Pj_description,Pj_titre,Pj_cagnotte,Pj_createur,Pj_categorie) values (?,?,?,?,?,?)',
    [[req.body.matricule],[req.body.description],[req.body.titre],[req.body.cagnotte],
    [req.body.createur],[req.body.categorie]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/projet/')
        }
    })
}


//modification d'un projet
const modifier = (req,res)=>{
    conn.query('UPDATE Projet Set Pj_matricule =?,Pj_description =?,Pj_titre =?,Pj_cagnotte =?,Pj_createur =?,Pj_categorie =? WHERE idProjet =?',
    [[req.body.matricule],[req.body.description],[req.body.titre],[req.body.cagnotte],
    [req.body.createur],[req.body.categorie],[req.params.id]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/projet/')
        }
    })
}



//redirection vers le formulaire de modification 
const modifier_get = (req,res)=>{
    conn.query('SELECT * FROM Projet',(err,rep)=>{
        if (err)throw err
        else{
            res.render('projet/frommod',{projet : rep.map(projet => new Projet(projet))})
        }
    })
}


//supresion d'un projet
const supprimer = (req,res)=>{
    conn.query('DELETE FROM Projet WHERE idProjet = ?',[[req.params.id]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/projet/')
        }
    })
}


//liste les projets
const lister = (req,res)=>{
    conn.query('SELECT * FROM Projet',(err,rep)=>{
        if (err)throw err
        else{
            res.render('projet/index',{projet : rep.map(projet => new Projet(projet))})
        }
    })
}


//lancement d'un projet
const start = (req,res)=>{
    Categorie.liste((categorie)=>{
        Pays.lister((pays)=>{
            res.render('client/projet/start',{pays : pays , categorie : categorie})
        })
    })
}


//redirection vers la page de creation des projet
const create = (req,res)=>{
    res.render('client/projet/create')
}


module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister,
    start,
    create
}