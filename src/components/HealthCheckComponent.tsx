import { HealthCheckEntry } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { HealthCheckRating } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import { useStateValue } from "../state";

const HealthCheckComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();

  const HealthRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon style={{ color: "green" }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: "orange" }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon style={{ color: "red" }} />;
    }
  };

  return (
    <Card
      key={entry.id}
      variant="outlined"
      style={{ margin: "5px", padding: "10px" }}
    >
      <p>
        {entry.date} <MedicalServicesIcon />
        <br />
        <i>{entry.description}</i>
        <br />
        {HealthRating(entry.healthCheckRating)}
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

export default HealthCheckComponent;
