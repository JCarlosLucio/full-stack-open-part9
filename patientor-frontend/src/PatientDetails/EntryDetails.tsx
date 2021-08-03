import React from 'react';
import { List } from 'semantic-ui-react';
import { Entry } from '../types';
import Codes from './Codes';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  return (
    <List.Item>
      {entry.date}
      <em> {entry.description}</em>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Codes codes={entry.diagnosisCodes} />
      )}
    </List.Item>
  );
};

export default EntryDetails;
