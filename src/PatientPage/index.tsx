import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Gender, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  return (
    <div className="Patient">
      {id && (
        <>
          <h1>
            {patients[id].name}{" "}
            {patients[id].gender == Gender.Male ? (
              <MaleIcon />
            ) : patients[id].gender == Gender.Female ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </h1>

          <p>
            ssn: {patients[id].ssn}
            <br />
            occupation: {patients[id].occupation}
          </p>

          <h2>entries</h2>
          {patients[id].entries.map((e) => (
            <div key={e.id}>
              <p>
                {e.date} <i>{e.description}</i>
              </p>
              <ul>
                {e.diagnosisCodes?.map((dc) => (
                  <li key={dc}>
                    {dc} {diagnoses[dc].name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;
