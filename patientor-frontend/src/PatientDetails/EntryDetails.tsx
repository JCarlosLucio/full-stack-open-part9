import React from 'react';
import { Entry } from '../types';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
