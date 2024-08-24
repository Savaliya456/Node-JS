const express = require('express');
const port = 3000;

const app = express();
const db = require("./config/database");
const crudSchema = require("./model/crudSchema");

app.use(express.urlencoded());

app.set("view engine" , "ejs");

app.get("/" , async (req,res)=>{
    const data = await crudSchema.find({})
    res.render("index", {data})
})

app.post("/insert", async (req, res)=>{
    const data = await crudSchema.create(req.body);
    data ? res.redirect("/") : console.log("Data Not Add");
})

app.get("/delete", async (req, res)=>{
    const data = await crudSchema.findByIdAndDelete(req.query.id);
    data ? res.redirect("/") : console.log("Not Delete");
})

app.get("/editData", async (req, res)=>{
    const singleData = await crudSchema.findById(req.query.id);
    singleData ? res.render("edit", {singleData}) : console.log("Data Not found");
})

app.post("/updateData", async (req, res)=>{
    const update = await crudSchema.findByIdAndUpdate(req.query.id,req.body);
    update ? res.redirect("/") : console.log("Data Not Update");
})

app.listen(port ,(err)=>{
    err ? console.log(err) : console.log("Server Start")
})