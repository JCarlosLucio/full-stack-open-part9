import React from 'react';
import { List } from 'semantic-ui-react';
import { Diagnosis } from '../types';

const Codes = ({ codes }: { codes: Array<Diagnosis['code']> }) => {
  return (
    <List bulleted>
      {codes.map((code) => (
        <List.Item key={code}>{code}</List.Item>
      ))}
    </List>
  );
};

export default Codes;
