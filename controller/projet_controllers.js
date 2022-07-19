const con = require('../config/db')
const Projet = require('../models/projet')



//ajout d;un projet
const ajouter = (req,res)=>{
    con.query('INSERT INTO Projet (Pj_matricule,Pj_description,Pj_titre,Pj_cagnotte,Pj_createur,Pj_categorie) values (?,?,?,?,?,?)',
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
    con.query('UPDATE Projet Set Pj_matricule =?,Pj_description =?,Pj_titre =?,Pj_cagnotte =?,Pj_createur =?,Pj_categorie =? WHERE idProjet =?',
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
    con.query('SELECT * FROM Projet',(err,rep)=>{
        if (err)throw err
        else{
            res.render('projet/frommod',{projet : rep.map(projet => new Projet(projet))})
        }
    })
}


//supresion d'un projet
const supprimer = (req,res)=>{
    con.query('DELETE FROM Projet WHERE idProjet = ?',[[req.params.id]],(err,rep)=>{
        if (err)throw err
        else{
            res.redirect('/projet/')
        }
    })
}


//liste les projets
const lister = (req,res)=>{
    con.query('SELECT * FROM Projet',(err,rep)=>{
        if (err)throw err
        else{
            res.render('projet/index',{projet : rep.map(projet => new Projet(projet))})
        }
    })
}




module.exports = {
    ajouter,
    modifier,
    modifier_get,
    supprimer,
    lister
}