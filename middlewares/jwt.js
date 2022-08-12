const data_session = (req,res,next)=>{
    res.locals.user = req.session.user
    next()
}

module.exports = {
    data_session
}