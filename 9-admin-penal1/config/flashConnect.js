module.exports.flashData = (req,res,next)=>{
    res.locals.flash = req.flash();
    next()
}