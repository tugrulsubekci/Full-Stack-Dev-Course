const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

var items = [];

app.get('/', (req, res) => {
    var date = new Date();
    var options = {
        weekday : "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    
    res.render('list', {
        dayName: date.toLocaleDateString("en-US", options),
        newListItems: items
    });
});

app.post("/", function(req, res) {
    var item = req.body.listItem;
    items.push(item);

    res.redirect("/");
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});