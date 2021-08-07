import React from 'react';
import { Entry, EntryType } from '../types';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalHealthcareDetails from './OccupationalHealthcareDetails';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
