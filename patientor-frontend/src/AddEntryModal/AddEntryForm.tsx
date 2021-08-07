import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Divider, FormGroup, Grid, Header } from 'semantic-ui-react';

import {
  DiagnosisSelection,
  EntryTypeOption,
  NumberField,
  SelectField,
  TextField,
} from './FormField';
import { useStateValue } from '../state';
import {
  EntryType,
  HealthCheckRating,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { isObject, isToLaterThanFrom, isValidDate } from '../utils';

export interface EntryFormValues
  extends Omit<HealthCheckEntry, 'id' | 'type'>,
    Omit<HospitalEntry, 'id' | 'type'>,
    Omit<OccupationalHealthcareEntry, 'id' | 'type'> {
  type: EntryType;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'Occupational Healthcare' },
];

// initial values for Formik
const initialBaseValues = {
  date: '',
  description: '',
  specialist: '',
  diagnosisCodes: undefined,
};

const initialHealthCheckValues = {
  healthCheckRating: HealthCheckRating.Healthy,
};

const initialHospitalValues = {
  discharge: {
    date: '',
    criteria: '',
  },
};

const initialOccupationalHealthcareValues = {
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: '',
  },
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        ...initialBaseValues,
        ...initialHealthCheckValues,
        ...initialHospitalValues,
        ...initialOccupationalHealthcareValues,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidDateError = 'Invalid date format. Must match YYYY-MM-DD';
        const minMaxError = 'Value must be between 0 - 3';
        const startDateError = '"From" date must be before "To" date';
        const endDateError = '"To" date must be after "From" date';
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.date && !isValidDate(values.date)) {
          errors.date = invalidDateError;
        }
        // Validations for HealthCheck Entry
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
          if (
            !(values.healthCheckRating >= 0 && 3 >= values.healthCheckRating)
          ) {
            errors.healthCheckRating = minMaxError;
          }
        }

        // Validations for Hospital Entry
        if (values.type === EntryType.Hospital) {
          if (!values.discharge.date) {
            errors.discharge = isObject(errors.discharge)
              ? { ...errors.discharge, date: requiredError }
              : { date: requiredError };
          }
          if (values.discharge.date && !isValidDate(values.discharge.date)) {
            errors.discharge = isObject(errors.discharge)
              ? { ...errors.discharge, date: invalidDateError }
              : { date: invalidDateError };
          }
          if (!values.discharge.criteria) {
            errors.discharge = isObject(errors.discharge)
              ? { ...errors.discharge, criteria: requiredError }
              : { criteria: requiredError };
          }
        }

        // Validations for Occupational Healthcare Entry
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (values.sickLeave.startDate && !values.sickLeave.endDate) {
            errors.sickLeave = isObject(errors.sickLeave)
              ? { ...errors.sickLeave, endDate: requiredError }
              : { endDate: requiredError };
          }
          if (values.sickLeave.endDate && !values.sickLeave.startDate) {
            errors.sickLeave = isObject(errors.sickLeave)
              ? { ...errors.sickLeave, startDate: requiredError }
              : { startDate: requiredError };
          }
          if (
            values.sickLeave.startDate &&
            !isValidDate(values.sickLeave.startDate)
          ) {
            errors.sickLeave = isObject(errors.sickLeave)
              ? { ...errors.sickLeave, startDate: invalidDateError }
              : { startDate: invalidDateError };
          }

          if (
            values.sickLeave.endDate &&
            !isValidDate(values.sickLeave.endDate)
          ) {
            errors.sickLeave = isObject(errors.sickLeave)
              ? { ...errors.sickLeave, endDate: invalidDateError }
              : { endDate: invalidDateError };
          }
          if (
            values.sickLeave.startDate &&
            isValidDate(values.sickLeave.startDate) &&
            values.sickLeave.endDate &&
            isValidDate(values.sickLeave.endDate) &&
            !isToLaterThanFrom(
              values.sickLeave.startDate,
              values.sickLeave.endDate
            )
          ) {
            errors.sickLeave = isObject(errors.sickLeave)
              ? {
                  ...errors.sickLeave,
                  startDate: startDateError,
                  endDate: endDateError,
                }
              : { startDate: startDateError, endDate: endDateError };
          }
        }

        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
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
              diagnoses={Object.values(diagnoses)}
            />

            {
              /** Healthcheck Entry */
              values.type === EntryType.HealthCheck && (
                <React.Fragment>
                  <Divider horizontal>
                    <label>Health Check</label>
                  </Divider>
                  <Field
                    label="Health Check Rating"
                    name="healthCheckRating"
                    min={HealthCheckRating.Healthy}
                    max={HealthCheckRating.CriticalRisk}
                    component={NumberField}
                  />
                </React.Fragment>
              )
            }

            {
              /** Hospital Entry */
              values.type === EntryType.Hospital && (
                <React.Fragment>
                  <Divider horizontal>
                    <label>Hospital</label>
                  </Divider>
                  <Field
                    label="Date of Discharge"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                  />
                  <Field
                    label="Discharge Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </React.Fragment>
              )
            }

            {
              /** Occupational Healthcare Entry */
              values.type === EntryType.OccupationalHealthcare && (
                <React.Fragment>
                  <Divider horizontal>
                    <label>Occupational Healthcare</label>
                  </Divider>
                  <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                  />
                  <Divider horizontal>
                    <Header size="tiny">Sick Leave (Optional)</Header>
                  </Divider>
                  <FormGroup widths="equal">
                    <Field
                      label="From"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.startDate"
                      component={TextField}
                    />
                    <Field
                      label="To"
                      placeholder="YYYY-MM-DD"
                      name="sickLeave.endDate"
                      component={TextField}
                    />
                  </FormGroup>
                </React.Fragment>
              )
            }

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
