import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';
import Codes from './Codes';

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Segment>
      <Header size="medium">
        <Header.Content>
          {entry.date}
          <Icon size="large" name="stethoscope" />
          {entry.employerName}
        </Header.Content>
        <Header.Subheader>
          <em>
            {entry.description} - {entry.specialist}
          </em>
        </Header.Subheader>
      </Header>

      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Codes codes={entry.diagnosisCodes} />
      )}

      {entry.sickLeave && (
        <Header size="small">
          <Icon size="huge" name="calendar alternate" />
          <Header.Content>
            Sick Leave
            <Header.Subheader>
              from {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
            </Header.Subheader>
          </Header.Content>
        </Header>
      )}
    </Segment>
  );
};

export default OccupationalHealthcareDetails;
