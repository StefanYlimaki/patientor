import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";

const PatientElement = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);

  return (
    <div>
      <h2>
        {patient?.name} <MaleIcon />{" "}
      </h2>
      <strong>
        <div>SSN: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
      </strong>
    </div>
  );
};

export default PatientElement;
