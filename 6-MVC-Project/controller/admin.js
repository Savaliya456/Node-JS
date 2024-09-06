const db = require('../config/db');
const schema = require('../model/movieSchema');
const fs = require('fs');


module.exports.home = async (req, res) => {
    const data = await schema.find({});
    res.render('index',{data})
};

module.exports.form = (req, res) => {
    res.render('form');
};

module.exports.addData = async (req, res) => {
    if (req.files) {
        req.body.coverImg = req.files.coverImg ? req.files.coverImg[0].path : null;
        req.body.poster = req.files.poster ? req.files.poster[0].path : null;
    }

    const isAdd = await schema.create(req.body)
    isAdd ? res.redirect('/') : console.log('Data Not Add Properly');
}


module.exports.deleteData = async (req,res)=>{
    const data = await schema.findById(req.query.id)
    if(data.coverImg) fs.unlinkSync(data.coverImg)
    if(data.poster) fs.unlinkSync(data.poster)

    const isdelete = await schema.findByIdAndDelete(req.query.id)
    isdelete ? res.redirect('/') : console.log('Data Not Delete Properly');
}

module.exports.editData = async (req,res)=>{
    const data = await schema.findById(req.query.id)
    data ? res.render('edit',{data}) : console.log('Data Not Found');
}

module.exports.updateData = async (req,res)=>{
    const data = await schema.findById(req.query.id)
    let coverImg = data.coverImg
    let poster = data.poster

    if(req.files){
        if(req.files.coverImg){
            coverImg = req.files.coverImg[0].path
            fs.unlinkSync(data.coverImg)
        }
        if(req.files.poster){
            poster = req.files.poster[0].path
            fs.unlinkSync(data.poster)
        }
    }
    req.body.coverImg = coverImg
    req.body.poster = poster

    const isupdate = await schema.findByIdAndUpdate(req.query.id,req.body)
    isupdate ? res.redirect('/') : console.log('Data Not Update Properly');
}

module.exports.detail = async (req,res)=>{
    const data = await schema.findById(req.query.id)
    data ? res.render('detailed',{data}) : console.log('Data Not Found');
}