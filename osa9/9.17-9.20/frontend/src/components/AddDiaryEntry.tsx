import { useState } from 'react';
import weatherService from '../services/weather';
import { NewDiaryEntry, Weather, Visibility } from '../types';
import { NonSensitiveDiaryEntry } from '../types';
import axios from 'axios';

interface AddDiaryEntryProps {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const AddDiaryEntry = ({ setEntries }: AddDiaryEntryProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | undefined>(
    undefined
  );
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!weather || !visibility) {
      setError('Not all inputs have a value!');
      return;
    }
    try {
      const newEntry: NewDiaryEntry = { date, weather, visibility, comment };
      const saved = await weatherService.create(newEntry);
      setEntries((entries) => [...entries, saved]);

      setDate('');
      setWeather(undefined);
      setVisibility(undefined);
      setComment('');
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);

        if (error.response) {
          console.log(error.response);
          setError(error.response.data);
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new diary entry</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        date:{' '}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        weather:
        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={(e) => setWeather(e.target.value as Weather)}
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        visibility:
        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
            />
            {v}
          </label>
        ))}
      </div>

      <div>
        comment:{' '}
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>

      <button type="submit">add</button>
    </form>
  );
};

export default AddDiaryEntry;
