require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.use(express.json());

const requestLogger = (req, res, next) => {
  console.log(req.method);
  next();
};
app.use(requestLogger);

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

const cors = require('cors');
app.use(cors());

const Person = require('./models/person.js');

// Checks if the given phone number is in the right format.
function isValidPhoneNumber(number) {
  const pattern = /^(?:\d{2}|\d{3})-\d{5,}$/;
  return pattern.test(number);
}

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      console.log(persons);
      res.json(persons);
    })
    .catch(next);
});

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.set('Content-Type', 'text/plain');
      res.send(
        `Phonebook has info for ${persons.length} people\n${new Date()}`
      );
    })
    .catch(next);
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

app.post('/api/persons', (req, res, next) => {
  const person = new Person({
    id: Math.floor(Math.random() * 1000000000),
    name: req.body.name,
    number: req.body.number,
  });

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  } else if (req.body.name.length < 3) {
    return res
      .status(400)
      .json({ error: 'Name must be atleast 3 characters long' });
  } else if (!isValidPhoneNumber(req.body.number)) {
    return res.status(400).json({ error: 'Number is in the wrong format' });
  }

  return Person.findOne({ name: req.body.name }).then((name) => {
    if (name) {
      return res.status(400).json({ error: 'Name must be unique' });
    } else {
      person
        .save()
        .then((savedPerson) => {
          res.status(201).json(savedPerson);
          console.log(`Added ${person.name} ${person.number} to the phonebook`);
        })
        .catch(next);
    }
  });
});

app.put('/api/persons/:id', (req, res, next) => {
  if (!isValidPhoneNumber(req.body.number)) {
    return res.status(400).json({ error: 'Number is in the wrong format' });
  }
  const person = {
    name: req.body.name,
    number: req.body.number,
  };

  return Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updated) => res.json(updated))
    .catch(next);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Id does not exist' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(unknownEndpoint);
app.use(errorHandler);
