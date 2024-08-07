const express=require('express');

const app=express();
app.use(express.urlencoded());
app.set("view engine","ejs");

var studentdata=[
  {
    id:1,
    name:"Hepin",

  },
  {
    id:2,
    name:"Harshil",

  },
  {
    id:3,
    name:"Raj",

  }
]

app.get("/",(req,resp)=>{
  resp.render("index",{
    student:studentdata
  });

});


app.post("/showdata",(req,resp)=>{

  const {id,name}=req.body;

  let obj = {
    id: id,
    name :name
  }
  studentdata.push(obj);
  resp.redirect("/")


})

app.get("/deletedata",(req,resp)=>{

  const id=req.query.userid;

  const data=studentdata.filter((el,i)=>{
        return el.id !=id
  })
  studentdata=data;
  resp.redirect("/");
})

app.get('/editdata', (req, res) => {
  const id = parseInt(req.query.userid, 10); 
  const student = studentdata.find(el => el.id === id);

  if (student) {
    res.render('editdata', { student });
  } else {
    res.status(404).send('Student not found.');
  }
});


app.post('/updatedata', (req, res) => {
  const { id, name } = req.body;
  const studentId = parseInt(id, 10);

  const student = studentdata.find(el => el.id === studentId);
  
  if (student) {
    student.name = name;
    res.redirect('/');
  } else {
    res.status(404).send('Student not found.');
  }
});


  

app.listen(8000,console.log("Server Started by port 8000"))