import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { HealthCheckEntry } from '../types';
import Codes from './Codes';

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const HEALTH_RATING_COLORS: SemanticCOLORS[] = [
    'green',
    'yellow',
    'orange',
    'red',
  ];

  return (
    <Segment>
      <Header size="medium">
        <Header.Content>
          {entry.date}
          <Icon size="large" name="doctor" />
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

      <Icon
        name="heart"
        color={HEALTH_RATING_COLORS[entry.healthCheckRating]}
      />
    </Segment>
  );
};

export default HealthCheckDetails;
