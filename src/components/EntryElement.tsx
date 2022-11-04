
import { Diagnosis, Entry } from "../types";
import { v1 as uuid } from 'uuid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckIcon from '@mui/icons-material/Check';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EntryElement = ({ entry, diagnoses }: {entry: Entry, diagnoses: Diagnosis[]}) => {
    return(
      <div style={{ border: "2px solid", borderRadius: "5px" }}>
        <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>
          {entry.date} 
          <EntryDetails entry={entry}/>
          {
            entry.type === 'OccupationalHealthcare' ? <>{entry.employerName}</> : <></>
          }
        </div>
        <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>
          <i>{entry.description}</i>
        </div>
        <div style={{ paddingTop: "5px", paddingLeft: "5px" }}>
          {
            diagnoses.map(diagnose => 
              entry.diagnosisCodes?.map(e => 
                diagnose.code === String(e)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                ? <li key={ uuid() }>{ diagnose.code } { diagnose.name }</li>
                : <div key={ uuid() }></div>
              )
            )
          }
        </div>
        <div>
          {
            entry.type === 'HealthCheck' ? <>{ <DisplayRating rating={entry.healthCheckRating}/> }</> : <></>
          }
        </div>
        <div style={{ paddingLeft: "5px" }}>
          diagnose by {entry.specialist}
        </div>
      </div>
        
    );
};

const DisplayRating = ({ rating }: { rating: number }): JSX.Element => {
  switch(rating) {
    case 0:
      return (
        <FavoriteIcon sx={{ color: "green" }}/>
      );
    case 1:
      return (
        <FavoriteIcon sx={{ color: "yellow" }}/>
      );
    case 2:
      return (
        <FavoriteIcon sx={{ color: "orange" }}/>
      );
    case 3:
      return(
        <FavoriteIcon sx={{ color: "red" }}/>
      );
    default: 
    return <></>;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case 'Hospital':
      return (
        <LocalHospitalIcon />
      );
    case 'OccupationalHealthcare':
      return (
        <WorkIcon />
      );
    case 'HealthCheck':
      return (
        <CheckIcon />
      );
    default: 
    return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


export default EntryElement;