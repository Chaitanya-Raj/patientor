import { HospitalEntry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Card from "@material-ui/core/Card";

const HospitalComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Card
      key={entry.id}
      variant="outlined"
      style={{ margin: "5px", padding: "10px" }}
    >
      <p>
        {entry.date} <LocalHospitalIcon />
        <br />
        <i>{entry.description}</i>
      </p>
      {/* <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc} {diagnoses[dc].name}
          </li>
        ))}
      </ul> */}
      <p>diagnosed by {entry.specialist}</p>
    </Card>
  );
};

export default HospitalComponent;
