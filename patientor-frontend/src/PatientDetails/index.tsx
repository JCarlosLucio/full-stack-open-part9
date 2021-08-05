import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Header, Icon, List } from 'semantic-ui-react';

import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import EntryDetails from './EntryDetails';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatient, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import { getGenderIcon } from '../utils';

const PatientDetails = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

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

    if (!patient || !patient?.ssn || !patient?.entries) {
      void fetchPatient();
    }
  }, []);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log('new entry values', values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
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

      <Header size="medium">entries</Header>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      <List size="large">
        {patient.entries && patient.entries.length > 0 ? (
          patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))
        ) : (
          <List.Item>No entries</List.Item>
        )}
      </List>
    </div>
  );
};

export default PatientDetails;
