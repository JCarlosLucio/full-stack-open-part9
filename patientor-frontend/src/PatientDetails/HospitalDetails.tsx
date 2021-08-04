import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
import Codes from './Codes';

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Segment>
      <Header size="medium">
        <Header.Content>
          {entry.date}
          <Icon size="large" name="hospital" />
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

      <Header size="small">
        <Icon name="calendar alternate" />
        <Header.Content>
          Discharge
          <Header.Subheader>
            {entry.discharge.date} - {entry.discharge.criteria}
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};

export default HospitalDetails;
