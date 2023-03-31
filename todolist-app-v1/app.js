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
    
    res.render('list', {
        listTitle: "item",
        newListItems: items
    });
});

app.get('/:dbEndPoint', async (req, res) => {
    var dbName = req.params.dbEndPoint;
    await getDatabaseByName(dbName);
    
    res.render('list', {
        listTitle: dbName,
        newListItems: items
    });
});

// app.post("/", function(req, res) {
//     let item = req.body.listItem;

//     if(req.body.addListItem === "Work") {
//         newItems.push(item);
//         res.redirect("/work")
//     }
//     else {
//         let todoListItem = new Item({
//             name: item
//         })
        
//         saveToDB(todoListItem);

//         items.push(item);
//         res.redirect("/");
//     }

// });
app.post("/:dbEndPoint", function(req, res) {
    var dbName = req.params.dbEndPoint;
    let item = req.body.listItem;
    const RouteItem = mongoose.model(dbName, itemSchema);
    let todoListItem = new RouteItem({
        name: item
    })
    
    saveToDB(todoListItem);

    items.push(item);
    if(dbName === "item") {
        dbName= "";
    }
    res.redirect("/"+ dbName);
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
async function getDatabaseByName(dbName) {
    const RouteItem = mongoose.model(dbName, itemSchema);
    const allItems = await RouteItem.find();
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