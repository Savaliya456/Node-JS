module.exports = (req,res,next)=>{
    if(req.cookies.admin == undefined){
        res.redirect('/')
    }
    else(
        next()
    ) 
}