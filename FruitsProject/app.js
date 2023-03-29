const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {type: String, required: true},
  rating: Number,
  review: String
})

const Fruit = mongoose.model('Fruit', fruitSchema);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
})

const Person = mongoose.model('Person', personSchema);

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
// getFruits();


// async function getFruits() {
//   await Fruit.find().then((collection)=> {
//     collection.forEach((f)=> {
//       console.log(f.name);
//     })
//   });
  
//   mongoose.connection.close();
// }

// saveBerries();

// async function saveBerries() {
//   const berries = new Fruit({
//     review: "very good berriesssss"
//   })

//   berries.save();

//   mongoose.connection.close();
// }

// deleteOne();

// async function deleteOne() {
//   await Person.deleteMany({name: "Deneme"}).then(function(deletedOne) {
//     console.log(deletedOne);
//   });

//   mongoose.connection.close();
// }
establishRelationship();
async function establishRelationship() {
  // const pineapple = new Fruit({
  //   name: "Pineapple",
  //   rating: 100,
  //   review:"From Turkey, greetings"
  // })

  // await pineapple.save();

  // const ahmet = new Person({
  //   name: "John",
  //   age: 33,
  // })

  // await ahmet.save();
  const pineapple = await Fruit.findOne({name: "Pineapple"});
  await Person.updateOne({name: "John"}, {favoriteFruit: pineapple});

  mongoose.connection.close();
}