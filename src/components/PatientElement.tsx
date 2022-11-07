import React from "react";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { Diagnosis, Gender, NewEntry, Patient } from "../types";
import { useState } from "react";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import EntryElement from "./EntryElement";
import Button from "@material-ui/core/Button";
import AddEntryModal from "./AddEntryModal";

const PatientElement = () => {
  const [error, setError] = React.useState<string>();
  const [, dispatch] = useStateValue();
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);
  const [diagnoses, setDiagnoses] = useState(Array<Diagnosis>());
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

 const submitNewEntry = async (values: NewEntry) => {
  try {
    const { data: newPatient } = await axios.post<Patient>(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${apiBaseUrl}/patients/${id}/entries`,
      values
    );
    dispatch({ type: "UPDATE_PATIENT", payload: newPatient });
    closeModal();
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(e?.response?.data || "Unrecognized axios error");
      setError(String(e?.response?.data?.error) || "Unrecognized axios error");
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }
};

  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try{
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({ type: "SET_DIAGNOSES_LIST", payload: diagnosisListFromApi });
        setDiagnoses(diagnosisListFromApi);
      } catch (error) {
        console.error(error);
      }
    };
    void fetchDiagnosisList();
    
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
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error} 
        onClose={closeModal} />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientElement;