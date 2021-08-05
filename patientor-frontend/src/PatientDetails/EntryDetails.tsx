import React from 'react';
import { Entry } from '../types';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
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
