let verif= (req,res,next)=>{
    let session=req.session;
if(session.user){
    next()
}else
    res.redirect('/signin')
}
module.exports ={
    verif 
}