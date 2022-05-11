import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from "@mui/icons-material/Work";
import Card from "@material-ui/core/Card";
import { useStateValue } from "../state";

const OccupationalHealthcareComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card
      key={entry.id}
      variant="outlined"
      style={{ margin: "5px", padding: "10px" }}
    >
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
        <br />
        <i>{entry.description}</i>
      </p>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc} {diagnoses[dc].name}
          </li>
        ))}
      </ul>
      <p>diagnosed by {entry.specialist}</p>
    </Card>
  );
};

export default OccupationalHealthcareComponent;
