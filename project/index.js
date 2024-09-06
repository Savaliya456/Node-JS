const express = require("express");
const app = express();
const db = require("./config/db");
const movieSchema = require("./model/movieSchema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter to allow only JPG files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only JPG files are allowed!"));
  }
};

const posterUpload = multer({
  storage: Storage,
  fileFilter: fileFilter,
}).fields([
  { name: "poster", maxCount: 1 },
  { name: "coverImg", maxCount: 1 },
]);

app.get("/", async (req, res) => {
  const data = await movieSchema.find({});
  res.render("index", { data });
});

app.post("/insertData", posterUpload, async (req, res) => {
  req.body.poster = req.files.poster[0].path;
  req.body.coverImg = req.files.coverImg[0].path;

  const insert = await movieSchema.create(req.body);
  insert ? res.redirect("/") : console.log("Not Inserted Successfully");
});

app.get("/deleteData", async (req, res) => {
  const data = await movieSchema.findById(req.query.id);

  if (data.poster) {
    fs.unlinkSync(data.poster);
  }
  if (data.coverImg) {
    fs.unlinkSync(data.coverImg);
  }
  const isDelete = await movieSchema.findByIdAndDelete(req.query.id);
  isDelete ? res.redirect("/") : console.log("Not Deleted");
});

app.get("/editData", async (req, res) => {
  const forUpdateData = await movieSchema.findById(req.query.id);
  forUpdateData
    ? res.render("edit", { data: forUpdateData })
    : console.log("Data not found for edit");
});

app.post("/updateData", posterUpload, async (req, res) => {
  const data = await movieSchema.findById(req.query.id);

  let post = data.poster;
  let cover = data.coverImg;

  if (req.files) {
    if (req.files.poster) {
      fs.unlinkSync(data.poster);
      post = req.files.poster[0].path;
    }
    if (req.files.coverImg) {
      fs.unlinkSync(data.coverImg);
      cover = req.files.coverImg[0].path;
    }
  }

  req.body.poster = post;
  req.body.coverImg = cover;
  const isUpdate = await movieSchema.findByIdAndUpdate(req.query.id, req.body);
  isUpdate
    ? res.redirect(`/fullDetail?id=${req.query.id}`)
    : console.log("Data not Updated");
});

app.get("/addMovie", (req, res) => {
  res.render("form");
});

app.get("/fullDetail", async (req, res) => {
  const singleData = await movieSchema.findById(req.query.id);
  res.render("showMovie", { data: singleData });
});

app.listen(1008, (err) => {
  console.log(err ? err : "Server Start on port 1008");
});
