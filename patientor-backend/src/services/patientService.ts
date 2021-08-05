import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';

const getPatients = (): Patient[] => patients;

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, newEntry: NewEntry): Entry => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }

  const entry = {
    id: uuid(),
    ...newEntry,
  };
  patient.entries.push(entry);

  return entry;
};

export default {
  getPatients,
  getPublicPatients,
  findById,
  addPatient,
  addEntry,
};
