module.exports.home = (req , res)=>{
    try{
        res.render('home')
    } catch(err){
        console.log(err)
    }
}

module.exports.about = (req , res)=>{
    try{
        res.render('about')
    } catch(err){
        console.log(err)
    }
}

module.exports.skills = (req , res)=>{
    try{
        res.render('skills')
    } catch(err){
        console.log(err)
    }
}

module.exports.contact = (req , res)=>{
    try{
        res.render('contact')
    } catch(err){
        console.log(err)
    }
}

module.exports.book = (req , res)=>{
    try{
        res.render('book')
    } catch(err){
        console.log(err)
    }
}