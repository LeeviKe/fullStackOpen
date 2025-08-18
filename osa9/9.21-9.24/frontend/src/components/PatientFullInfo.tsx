import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patients from '../services/patients';
import { Patient } from '../types';

const PatientFullInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatientData = async () => {
      if (!id) {
        return;
      }
      try {
        const data = await patients.getById(id);
        setPatient(data);
      } catch (error) {
        console.error('Getting the patient failed', error);
      }
    };

    getPatientData();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <div>
        <h3>Entries</h3>
        {patient.entries.map((entry) => {
          return (
            <div key={entry.id}>
              <p>
                {entry.date} {entry.description}
              </p>

              {entry.diagnosisCodes?.map((code) => {
                return <div key={code}>{code}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientFullInfo;
