import { Diagnosis } from '../../types';
import diagnosesData from '../../data/diagnoses';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiaries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiaries,
};
