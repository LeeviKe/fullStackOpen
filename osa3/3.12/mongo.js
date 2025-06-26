const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = zwARgzxX1OouXOIT;

const url = `mongodb+srv://letuxdd:${password}@cluster0.xxt0nqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`Added ${person.name} ${person.number} to the phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('Phonebook');
    persons.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
}
