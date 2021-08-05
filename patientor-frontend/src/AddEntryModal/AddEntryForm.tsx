import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Grid } from 'semantic-ui-react';

import { DiagnosisSelection, NumberField, TextField } from './FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { isValidDate } from '../utils';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'HealthCheck',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const invalidDateError = 'Invalid date format. Must match YYYY-MM-DD';
        const minMaxError = 'Value must be between 0 - 3';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating && values.healthCheckRating !== 0) {
          errors.healthCheckRating = requiredError;
        }

        if (values.date && !isValidDate(values.date)) {
          errors.date = invalidDateError;
        }
        if (!(values.healthCheckRating >= 0 && 3 >= values.healthCheckRating)) {
          errors.healthCheckRating = minMaxError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              min={HealthCheckRating.Healthy}
              max={HealthCheckRating.CriticalRisk}
              component={NumberField}
            />
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
