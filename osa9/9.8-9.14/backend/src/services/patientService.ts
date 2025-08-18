import patients from '../../data/patients';
import { SafePatient, Patient, NewPatient } from '../../types';
import { v1 as uuid } from 'uuid';

const getSafePatients = (): SafePatient[] => {
  const safePatients: SafePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );

  return safePatients;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getSafePatients,
  addPatient,
};
