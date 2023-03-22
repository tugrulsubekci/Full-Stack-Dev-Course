const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
})

const Person = mongoose.model('Person', personSchema);
  
main();

async function main() {
  const person = new Person({
    name: "Deneme",
    age: 99
  });

  await person.save();
};