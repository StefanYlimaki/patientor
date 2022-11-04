import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Gender } from "../types";

const PatientElement = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);
  console.log(patient);
  let key = 1;

  return (
    <div>
      <h2>
        {patient?.name} {patient?.gender === Gender.Male ? <MaleIcon /> : <FemaleIcon /> }
      </h2>
      <div>SSN: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>Entries: </h3>
      { patient?.entries.map(e => 
        <div key={e.id}>
          { e.date } { e.description }
          <div>{ e.diagnosisCodes?.map(d => <li key={key += 1}>{ d }</li>) }</div>
        </div>) }
      
    </div>
  );
};

export default PatientElement;
