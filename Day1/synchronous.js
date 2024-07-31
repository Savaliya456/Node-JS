const fs = require('fs')

fs.writeFileSync('hello.txt','this is text message ');

fs.appendFileSync('hello.txt', 'from the synchronous file')

fs.renameSync('hello.txt','test.txt')

console.log(fs.readFileSync('test.txt').toString())