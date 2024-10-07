const passport = require('passport');
const passportSt = require('passport-local').Strategy
const userSchema = require('../model/user')

passport.use('local', new passportSt( 
    {usernameField : 'email'},
    async (email, password, done) => {
        const user = await userSchema.findOne({email : email})
        if(user){
            if(user.password === password){
                return done(null, user)
            } else{
                return done(null, false)
            }
        }else{
            console.log("Error While Authenticating");
        }
    }
))

passport.serializeUser((user,done)=>{
    return done(null, user.id)
}) 

passport.deserializeUser(async (id,done)=>{
    try{
        const user = await userSchema.findById(id)
        if(user) return done(null, user)
        else return done(null, false)
    } catch(err){
        console.log(err);
    }
})

passport.checkAuthantication = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/login')
    }
}

passport.authUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport