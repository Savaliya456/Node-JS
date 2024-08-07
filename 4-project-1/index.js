const express = require('express')
const app = express()
app.use(express.urlencoded())
app.set('view engine','ejs')

var allTask = [
    {
        id : 1,
        task : 'Reading'
    }
]


app.get('/',(req,res)=>{
    res.render('index',{allTask})
})

app.post('/addtask',(req,res)=>{
    const {task} = req.body 

    const obj = {
        id : allTask[allTask.length-1].id +1 ||1,
        task : task
    }
    allTask.push(obj)
    res.redirect('/')
})

app.get('/deleteTask',(req,res)=>{
    const id = req.query.id

    const tasks = allTask.filter((el)=>{
        return el.id !=id
    })
    allTask = tasks

    res.redirect('/')
})

app.get('/edit',(req,res)=>{
    const id = req.query.updateid

    const edittask = allTask.find(el=>el.id==id) 

    res.render("edit",{edittask})

})

app.post('/update',(req,res)=>{
    const {editid,edittask} = req.body

    const editdata = allTask.find(el=>el.id==editid)

    // const obj={
        editdata.task=edittask
        res.redirect("/")

    // }
})

app.listen(3000,console.log('Server is runnig'))