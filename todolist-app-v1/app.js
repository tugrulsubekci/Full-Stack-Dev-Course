const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items = ["Go to home", "Go to school", "Go to work"];
let newItems = [];

app.get('/', (req, res) => {

    let day = date.getDate();
    
    res.render('list', {
        listTitle: day,
        newListItems: items
    });
});

app.get('/work', (req, res) => {
    res.render('list', {
        listTitle: "Work",
        newListItems: newItems
    });
});

app.post("/", function(req, res) {
    let item = req.body.listItem;

    if(req.body.addListItem === "Work") {
        newItems.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/");
    }

})

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});