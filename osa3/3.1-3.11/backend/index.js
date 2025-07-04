const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('dist'));

const morgan = require('morgan');
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms :body'));

const cors = require('cors');
app.use(cors());

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`Phonebook has info for ${persons.length} people\n${new Date()}`);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id); // Converts the gotten id (string) into a number, matching the persons array.
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const person = {
    id: Math.floor(Math.random() * 1000000000),
    name: req.body.name,
    number: req.body.number,
  };

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  if (
    persons.find((p) => p.name.toLowerCase() === req.body.name.toLowerCase())
  ) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  persons.push(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
