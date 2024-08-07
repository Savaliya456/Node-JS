const http = require('http');
const fsPromise = require('fs/promises')
const server = http.createServer( async (req, res)=>{

    const path = req.url;
    const method = req.method;


    if(path.includes('file') && method=='GET'){
        const fileName = path.split('/').pop()
        console.log(fileName)
        const data = await fsPromise.readFile('./'+fileName)
        res.end(data)
    }
    else if(path.includes('/')){
        res.write("Hello! , starting is from here ");
        res.end("this is end");
    }
    else{
        res.end('Not Found');
    }

})

server.listen(6700, ()=>{
    console.log("Server is running")
})