const categorySchema = require('../model/category')

module.exports.addCategory = async (req,res)=>{
    res.render('pages/category/addCategory')
}

module.exports.addCategoryPost = async (req,res)=>{
    if(req.files){
        req.body.categoryImage = req.files.categoryImage[0].path;
    }
    
    const isAdd = await categorySchema.create(req.body)
    isAdd ? res.redirect('/category/viewCategory') : console.log("Error while Category Adding");
}

module.exports.viewCategory = async (req,res)=>{
    const data = await categorySchema.find({})
    res.render('pages/category/viewCategory', {data})
}

module.exports.deleteCategory = async (req,res)=>{
    const isdelete = await categorySchema.findByIdAndDelete(req.query.id)
    isdelete ? res.redirect('/category/viewCategory') : console.log("Error While deleting category");
}