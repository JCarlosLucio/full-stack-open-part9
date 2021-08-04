import React from 'react';
import { List } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';

const Codes = ({ codes }: { codes: Array<Diagnosis['code']> }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <List bulleted>
      {codes.map((code) => (
        <List.Item key={code}>
          {code} {diagnoses[code].name}
        </List.Item>
      ))}
    </List>
  );
};

export default Codes;
