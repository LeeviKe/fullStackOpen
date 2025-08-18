import { NonSensitiveDiaryEntry } from '../types';

interface DiaryEntriesProps {
  entries: NonSensitiveDiaryEntry[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps): JSX.Element => {
  const style = {
    marginBottom: '30px',
  };

  return (
    <div>
      <h1>Diary entries</h1>
      {entries.map((entry) => (
        <div key={entry.id} style={style}>
          <p>
            <strong>{entry.date}</strong>
          </p>
          <p>Visibility: {entry.visibility}</p>
          <p>Weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
