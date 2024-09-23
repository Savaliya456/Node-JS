const passport = require('passport')
const passportSt = require('passport-local').Strategy
const UserSchema = require('../model/adminSchema')

passport.use('local', new passportSt(
    {usernameField : 'email'},
    async(email,password,done)=>{
        const data = await UserSchema.findOne({email : email})
        if(data){
            if(data.password == password){
                done(null,data)
            }
            else{
                done(null,false)
            }
        }
        else{
            done(null,false)
        }
    }
))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    const data = await UserSchema.findById(id)
    if(data) done(null,data)
    else done(null,false)
})

passport.checkAuthantication =(req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

module.exports = passport