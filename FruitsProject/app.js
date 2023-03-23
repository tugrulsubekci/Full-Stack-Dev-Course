const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const Person = mongoose.model('Person', personSchema);

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
})

const Fruit = mongoose.model('Fruit', fruitSchema);
  
// main();

// async function main() {
//   const apple = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Pretty solid as a fruit"
//   });
//   const kiwi = new Fruit({
//     name: "Kiwi",
//     review: "The best fruit!"
//   });
//   const orange = new Fruit({
//     name: "Orange",
//     review: "Too sour for me!"
//   });
//   const banana = new Fruit({
//     name: "Banana",
//     review: "Weird texture"
//   });

//   await apple.save();
//   await kiwi.save();
//   await orange.save();
//   await banana.save();
// };
getFruits();


async function getFruits() {
  await Fruit.find().then((collection)=> {
    collection.forEach((f)=> {
      console.log(f.name);
    })
  });

  mongoose.connection.close();
}