/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { addPatient, setPatient, useStateValue } from "../state";
import { Gender, HealthCheckEntry, Patient } from "../types";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import HospitalComponent from "../components/HospitalComponent";
import OccupationalHealthcareEntry from "../components/OccupationalHealthcareComponent";
import HealthCheckComponent from "../components/HealthCheckComponent";
import AddEntryModal from "../AddEntryModal";
import Button from "@material-ui/core/Button";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = Object.values(patients).find((p) => p.id == id);

      if (updatedPatient) {
        updatedPatient.entries.push(newEntry);
        dispatch(addPatient(updatedPatient));

        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

          {patients[id].entries.length !== 0 && (
            <div>
              <h2>entries</h2>
              {patients[id].entries.map((e) => {
                switch (e.type) {
                  case "Hospital":
                    return <HospitalComponent entry={e} />;
                  case "OccupationalHealthcare":
                    return <OccupationalHealthcareEntry entry={e} />;
                  case "HealthCheck":
                    return <HealthCheckComponent entry={e} />;
                  default:
                  // return assertNever(e);
                }
              })}
            </div>
          )}
        </>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
