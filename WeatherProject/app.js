const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { urlencoded } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    var city = req.body.cityName;
    var apikey = "95b4eb5526cd5403c9bf75ace0fd070e";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit;



    var imgurl = "http://openweathermap.org/img/wn/";
    https.get(url, function (response) {
        console.log(url);
        response.on('data', function (data) {
            const parsedData = JSON.parse(data);
            const description = parsedData.weather[0].description;
            const icon = parsedData.weather[0].icon;
            const temperature = parsedData.main.temp;
            imgurl += icon + ".png";
            console.log(imgurl);
            res.send("<h1>The temperature in " + city + " is "+ temperature + "&#8451" +"</h1>" +
                    "<h2>The weather is "+ description +"</h2>" +
                    "<img src=" + imgurl + ">");
        });
    })
})


app.listen(3000, function () {
    console.log('listening on port 3000');
});