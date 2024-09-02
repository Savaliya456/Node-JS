const express = require('express');
const app = express();
const path = require('path')
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.set("view engine", "ejs");

var studentdata = [
    {
        id: 1,
        name: "Harshil",
        email : "harshil@gmail.com"
    },
    {
        id: 2,
        name: "Vivek",
        email:"vivek@gmail.com"
    }
]

const middlewared = (req,res,next)=>{
    if(req.body.name){
        next();
    }else{
        res.redirect('/')
    }
}
app.get("/", (req, res) => {

    res.render("index", {
        studentdata
    })

})

app.post("/inserdata", middlewared, (req, res) => {

    const { name,email } = req.body;

    const obj = {
        id: (studentdata[studentdata.length - 1].id)+ 1,
        name: name,
        email: email
    }

    studentdata.push(obj);
    res.redirect("/");
});

app.get("/deletedata",  (req, res) => {

    const id = req.query.userid;

    const data = studentdata.filter((el) => {
        return el.id != id
    })

    studentdata = data;
    res.redirect("/");
})

app.get("/editdata",(req,res)=>{
    const id = req.query.userid;
    const data = studentdata.find(el=>el.id == id)

    if (data) {
        res.render('edit', { data });
    }else {
        res.status(404).send('Student not found.');
    }
})


app.post('/updatedata',(req,res)=>{
    const {id, name, email} = req.body
    const stu_id = parseInt(id)

    const student = studentdata.find(el=>el.id == stu_id)

    if(student){
        student.name = name
        student.email = email
    }

    res.redirect('/')
})

app.get('/admin',(req,res)=>{
    res.render('admin')
})


app.listen(7000, console.log("Server Started......"));