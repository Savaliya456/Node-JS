const categorySchema = require('../model/category')
const subcategorySchema = require('../model/subcategory')
const productSchema = require('../model/products')

module.exports.addCategory = async (req,res)=>{
    res.render('pages/category/addCategory')
}

module.exports.addCategoryPost = async (req,res)=>{
    const isAdd = await categorySchema.create(req.body)
    isAdd ? res.redirect('/category/viewCategory') : console.log("Error while Category Adding");
}

module.exports.viewCategory = async (req,res)=>{
    const data = await categorySchema.find({})
    res.render('pages/category/viewCategory', {data})
}

module.exports.deleteCategory = async (req,res)=>{
    await productSchema.deleteMany({ categoryId: req.query.id });
    await subcategorySchema.deleteMany({categoryId : req.query.id});

    const isdelete = await categorySchema.findByIdAndDelete(req.query.id)
    isdelete ? res.redirect('/category/viewCategory') : console.log("Error While deleting category");
}

module.exports.editCategory = async (req,res)=>{
    const data = await categorySchema.findById(req.query.id)
    data ? res.render('pages/category/editCategory', {data}) : console.log('Error While editing category');
}

module.exports.updateCategory = async (req,res)=>{
    console.log(req.body, req.query.id);
    const isUpdate = await categorySchema.findByIdAndUpdate(req.query.id, req.body)
    isUpdate ? res.redirect('/category/viewCategory') : console.log("Error While updating category");
}