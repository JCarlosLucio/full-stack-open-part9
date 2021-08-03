import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Header, Icon, List } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { Gender, GenderIcon, Patient } from '../types';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || !patient?.ssn) {
      void fetchPatient();
    }
  }, []);

  const getGenderIcon = (gender: Gender): GenderIcon => {
    switch (gender) {
      case Gender.Male:
        return GenderIcon.Male;
      case Gender.Female:
        return GenderIcon.Female;
      default:
        return GenderIcon.Other;
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Header size="large">
        <Header.Content>
          {patient.name}
          <Icon name={getGenderIcon(patient.gender)} />
        </Header.Content>
      </Header>
      <List size="large">
        <List.Item>ssn: {patient.ssn}</List.Item>
        <List.Item>occupation: {patient.occupation}</List.Item>
      </List>
    </div>
  );
};

export default PatientDetails;
