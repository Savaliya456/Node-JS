const express = require('express');
const port = 3000;
const app = express();
const db = require("./config/database");
const crudSchema = require("./model/crudSchema");
const multer = require("multer")
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded());

app.set("view engine" , "ejs");

const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + "-" + Date.now())
    }
})

const uploadPic = multer({ storage : Storage}).single("image");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.get("/" , async (req,res)=>{
    const data = await crudSchema.find({})
    res.render("index", {data})
})


app.post("/insert", uploadPic , async (req, res)=>{
    req.body.image = req.file.path
    const data = await crudSchema.create(req.body);
    data ? res.redirect("/") : console.log("Data Not Add");
})

app.get("/delete", async (req, res)=>{
    const singleData = await crudSchema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    const data = await crudSchema.findByIdAndDelete(req.query.id);
    data ? res.redirect("/") : console.log("Not Delete");
})

app.get("/editData", async (req, res)=>{
    const singleData = await crudSchema.findById(req.query.id);
    singleData ? res.render("edit", {singleData}) : console.log("Data Not found");
})

app.post("/updateData", uploadPic, async (req, res)=>{
    let img = "";
    let singleData = await crudSchema.findById(req.query.id);
    req.file ? img = req.file.path : img = singleData.image;
    if (req.file){
        fs.unlinkSync(singleData.image)
    }
    console.log(img)
    req.body.image = img
    let update = await crudSchema.findByIdAndUpdate(req.query.id,req.body);
    update ? res.redirect("/") : console.log("Data Not Update");
})

app.listen(port ,(err)=>{
    err ? console.log(err) : console.log("Server Start")
})