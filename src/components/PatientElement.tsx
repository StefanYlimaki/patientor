import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis, Gender } from "../types";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import EntryElement from "./EntryElement";

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
        <div key={e.id} style={{ paddingTop: "10px" }}>
          <EntryElement entry={e} diagnoses={diagnoses}/>
        </div>) 
      }
    </div>
  );
};

export default PatientElement;