import axios from 'axios';
import {
  // Weather,
  // Visibility,
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}`);

  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${apiBaseUrl}`, object);
  return data;
};
export default {
  getAll,
  create,
};
