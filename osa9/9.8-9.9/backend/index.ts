import express from 'express';
import cors from 'cors';
import diagnosisService from './src/services/diagnosisService';
import patientService from './src/services/patientService';
import toNewPatient from './utils';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const diagnoses = diagnosisService.getDiaries();
  res.json(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  const patients = patientService.getSafePatients();
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
