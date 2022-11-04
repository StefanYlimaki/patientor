import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis, Gender } from "../types";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import {v1 as uuid } from 'uuid'; 

const PatientElement = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);
  const [diagnoses, setDiagnoses] = useState(Array<Diagnosis>());
 
  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.get(`${apiBaseUrl}/diagnoses`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setDiagnoses(data);
    };
    
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <h2>
        {patient?.name} {patient?.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon /> }
      </h2>
      <div>SSN: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>Entries: </h3>
      { 
      patient?.entries.map(e => 
        <div key={e.id}>
          { e.date } { e.description }
          <div>
            {
              diagnoses.map(diagnose => 
                e.diagnosisCodes?.map(e => 
                  diagnose.code === String(e)
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                  ? <li key={ uuid() }>{ diagnose.code } { diagnose.name }</li>
                  : <div key={ diagnose.code }></div>
                )
              )
            }
          </div>
        </div>) 
      }
    </div>
  );
};

export default PatientElement;