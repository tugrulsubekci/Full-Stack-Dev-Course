const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = 3000;

app.get('/', (req, res) => { 
    res.sendFile(__dirname + "/index.html", function (err, body) {
        if (err) {
            console.log(err);
        }
        console.log(body);
    })
});

app.post('/', (req, res) => {
    var body = req.body;
    console.log(body);
    var num1 = Number(body.num1);
    var num2 = Number(body.num2);

    var result = num1 + num2;
    res.send("calculation result is: " + result);
});

app.listen(PORT, () => {
    console.log('listening on port  3000');
});