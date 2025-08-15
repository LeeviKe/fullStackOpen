import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'Malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'Parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (isNaN(target)) {
    res.status(400).json({ error: 'Malformatted parameters' });
  }
  for (const day of daily_exercises) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(day)) {
      res.status(400).json({ error: 'Malformatted parameters' });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exercises = calculateExercises(target, daily_exercises);

  return res.send({ exercises });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
