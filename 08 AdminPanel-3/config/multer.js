const multer = require('multer')
const path = require('path')

const Storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        let subFolder = "uploads/"
        if(req.route.path == '/addProduct' || req.route.path == '/updateProduct'){
            subFolder = "uploads/products/"
        }
        cb(null, `${subFolder}`)
    },
    filename : (req,file,cb)=>{
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const uplodImage = multer({storage : Storage}).fields([
    {name : "profile", maxCount : 1},
    {name : "productImage", maxCount : 1}
])

module.exports = uplodImage;