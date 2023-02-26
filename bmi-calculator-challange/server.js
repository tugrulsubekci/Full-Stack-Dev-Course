const express = require('express');
const bodyParser = require("body-parser");

var PORT = 3000;
var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get( "/", (req,res) => {
    res.sendFile(__dirname + "/bmi-calculator.html", function (err, body) {
        if (err) {
            console.log(err);
        }
        console.log(body);
    })
})

app.post("/bmi-calculator", (req,res) => {
    var body = req.body;
    var height = Number(body.height);
    var weight = Number(body.weight);
    console.log(height);
    console.log(weight);
    var bmiValue = weight / Math.pow(height,2);
    res.send("bmi value is: " + bmiValue);
})

app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
})