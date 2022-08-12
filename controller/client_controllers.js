const conn =  require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Utilisateur = require('../models/utilisateur')

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//jwt function

const signin_get = (req,res)=>{
    res.render('client/signin')
}


const signup_get = (req,res)=>{
    res.render('client/signup')
}


//connexion a un compte existant
const signin = (req,res, next)=>{
    var test = emailRegExp.test(req.body.nom);
        if(!test){
            conn.query('SELECT * FROM Utilisateur where User_nom= ? AND User_mot_de_passe=?',[[req.body.nom],[req.body.mot_de_passe]],(err,rep)=>{
                if(err) throw err
                else{
                    if(!rep.length){
                        req.flash('error',"Identifiant ou mot de passe incorrect :(")
                        res.redirect('/signin')
                    }
                    else{
                        rep.map(user => new Utilisateur(user))
                        req.session.user = {
                            id : rep[0].idUtilisateur,
                            nom : rep[0].User_nom,
                            photo_profil : rep[0].User_photo_profil,
                            photo_page : rep[0].User_photo_page,
                            description : rep[0].User_description,
                            reseaux_saciaux : rep[0].User_reseaux_socials,
                            projets_suivis: rep[0].User_projets_suivis,
                            pays : rep[0].Pays_idPays,
                        }
                            next()
                    }
                }
            })
        }
        else {
            conn.query('SELECT * FROM Utilisateur where User_email = ? AND User_mot_de_passe=?',[[req.body.nom],[req.body.mot_de_passe]],(err,rep)=>{
                if(err) throw err
                else{
                    if(!rep.length){
                        req.flash('error',"email ou mot de passe incorrect :(")
                        res.redirect('/signin')
                    }
                    else{
                        rep.map(user => new Utilisateur(user))
                        req.session.user = {
                            id : rep[0].idUtilisateur,
                            nom : rep[0].User_nom,
                            photo_profil : rep[0].User_photo_profil,
                            photo_page : rep[0].User_photo_page,
                            description : rep[0].User_description,
                            reseaux_saciaux : rep[0].User_reseaux_socials,
                            projets_suivis: rep[0].User_projets_suivis,
                            pays : rep[0].Pays_idPays,
                        }
                        next()
                    }
                }
            })
        }
    
}


//inscription d'un nouvel utilisateur
const signup = (req,res, next)=>{
    if(((req.body.nom == '' || req.body.mail == '')||(req.body.mot_de_passe == '' || req.body.mot_de_passe_conf == ''))){
        req.flash('error',"Acun champ ne peut etre vide")
        res.redirect('/signup')
    }
    else if(req.body.mot_de_passe.length < 6){
        req.flash('error',"le mot de passe doit contenir au moins 6 caracteres")
        res.redirect('/signup')
    }
    else if(req.body.mot_de_passe != req.body.mot_de_passe_conf){
        req.flash('error',"confirmation de mot de passe incorect")
        res.redirect('/signup')
    }
    else {
        var test = emailRegExp.test(req.body.mail);
        if(!test){
            req.flash('error',"adresse mail invalide")
            res.redirect('/signup')
        }
        else{ 
            conn.query('SELECT User_nom FROM Utilisateur where User_email = ?',[[req.body.mail]],(err,rep)=>{
            if(err) throw err
            else{
                console.log(rep)
                if(rep.length){
                    req.flash('error',"email deja utiliser par un autre utilisateur :(")
                    res.redirect('/signup')
                }
                else{
                    conn.query('INSERT INTO Utilisateur (User_nom,User_email, User_mot_de_passe) values (?,?,?)',[
                        [req.body.nom],[req.body.mail],[req.body.mot_de_passe]],(err,rep)=>{
                            if (err) throw err
                            else{
                                res.redirect('/')
                            }
                        })
                }
            }
        })
            
        }

    }
}






module.exports = {
    signin,
    signin_get,
    signup_get,
    signup
}