const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const { json } = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB", {useNewUrlParser: true});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Item = mongoose.model("Item", itemSchema);

app.set('view engine', 'ejs');

let items = [];
let newItems = [];

app.get('/', async (req, res) => {
    await getItemsDB();
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
        let todoListItem = new Item({
            name: item
        })
        
        saveToDB(todoListItem);

        items.push(item);
        res.redirect("/");
    }

});

app.post("/delete", async function(req, res) {
    const id = req.body.checkbox;
    await deleteByID(id);
    res.redirect("/");
});

async function saveToDB(item) {
    await item.save();
}
async function getItemsDB() {
    const allItems = await Item.find();
    console.log(allItems);
    items = [];
    allItems.forEach(function(item) {
        items.push(item);
    });
}

async function deleteByID(id) {
    await Item.findByIdAndRemove(id);
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});