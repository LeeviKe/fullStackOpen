import { useEffect, useState } from 'react';
import weatherService from './services/weather';
import type { NonSensitiveDiaryEntry } from './types';

import DiaryEntries from './components/DiaryEntries';
import AddDiaryEntry from './components/AddDiaryEntry';

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await weatherService.getAll();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <AddDiaryEntry setEntries={setEntries} />
      <DiaryEntries entries={entries} />
    </div>
  );
};

export default App;
