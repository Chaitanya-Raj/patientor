import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import {
  DiagnosisSelection,
  HealthCheckRatingOption,
  EntryTypeOption,
  TypeField,
  SelectField,
  TextField,
} from "./FormField";
import { HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export interface EntryFormValues {
  date?: string;
  type?: string;
  specialist?: string;
  description?: string;
  employerName?: string;
  diagnosisCodes?: Array<string>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  discharge?: {
    date: string;
    criteria: string;
  };
  healthCheckRating?: HealthCheckRating;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "Hospital", label: "Hospital" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        type: "HealthCheck",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "",
        discharge: { date: "", criteria: "" },
        sickLeave: { startDate: "", endDate: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (values.type == "HealthCheck" && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type == "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type == "Hospital" && !values.discharge) {
          errors.discharge = requiredError;
        }
        if (values.type == "Hospital" && !values.discharge?.date) {
          errors.dischargeDate = requiredError;
        }
        if (values.type == "Hospital" && !values.discharge?.criteria) {
          errors.dischargeCriteria = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(values);

        switch (values.type) {
          case "HealthCheck":
            return (
              <Form className="form ui">
                <TypeField
                  label="Type"
                  name="type"
                  options={entryTypeOptions}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <SelectField
                  label="HealthCheckRating"
                  name="healthCheckRating"
                  options={healthCheckRatingOptions}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  diagnoses={Object.values(diagnoses)}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          case "OccupationalHealthcare":
            return (
              <Form className="form ui">
                <TypeField
                  label="Type"
                  name="type"
                  options={entryTypeOptions}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="EmployerName"
                  placeholder="EmployerName"
                  name="employerName"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="StartDate"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="EndDate"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );

          case "Hospital":
            return (
              <Form className="form ui">
                <TypeField
                  label="Type"
                  name="type"
                  options={entryTypeOptions}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  diagnoses={Object.values(diagnoses)}
                />
                <Field
                  label="DischargeDate"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="DischargeCriteria"
                  placeholder="DischargeCriteria"
                  name="discharge.criteria"
                  component={TextField}
                />
                <Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={{ float: "left" }}
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="submit"
                      variant="contained"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
