const express = require("express");
const app = express();

var PORT = 3333;

app.get('/', (req, res) => {  
    res.send("<h1>HELLO MAN</h1>");
})
app.get('/contact', (req, res) => {  
    res.send("my email address: tugrul@subekci.com");
})
app.get('/about', (req, res) => {  
    res.send("I am a software developer");
})
app.get('/deneme', (req, res) => {  
    res.send("deneme");
})

app.listen(PORT, function   () {
console.log("App listening on PORT " + PORT);
})