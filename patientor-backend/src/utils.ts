import {
  Diagnosis,
  Discharge,
  EntryType,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  SickLeave,
} from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/* type guards */
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDiagnosisCodes = (
  params: unknown
): params is Array<Diagnosis['code']> => {
  return Array.isArray(params) && params.every((param) => isString(param));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  return (
    'criteria' in param &&
    'date' in param &&
    isString(param.criteria) &&
    isString(param.date) &&
    isDate(param.date)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  return (
    'startDate' in param &&
    'endDate' in param &&
    isString(param.startDate) &&
    isDate(param.startDate) &&
    isString(param.endDate) &&
    isDate(param.endDate)
  );
};

/** New Patient*/
/* parsers */
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${JSON.stringify(name)}`);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(
      `Incorrect or missing dateOfBirth: ${JSON.stringify(dateOfBirth)}`
    );
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${JSON.stringify(gender)}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(
      `Incorrect or missing occupation: ${JSON.stringify(occupation)}`
    );
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
  return newPatient;
};

/**  New Entry*/
/* parsers */
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(
      `Incorrect or missing description: ${JSON.stringify(description)}`
    );
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${JSON.stringify(date)}`);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(
      `Incorrect or missing specialist: ${JSON.stringify(specialist)}`
    );
  }
  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> | undefined => {
  if (!diagnosisCodes) {
    return;
  }
  if (!isDiagnosisCodes(diagnosisCodes)) {
    throw new Error(
      `Incorrect diagnosisCodes: ${JSON.stringify(diagnosisCodes)}`
    );
  }
  return diagnosisCodes;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${JSON.stringify(type)}`);
  }
  return type;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${JSON.stringify(
        healthCheckRating
      )}`
    );
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(
      `Incorrect or missing discharge: ${JSON.stringify(discharge)}`
    );
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(
      `Incorrect or missing employerName: ${JSON.stringify(employerName)}`
    );
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect sickLeave: ${JSON.stringify(sickLeave)}`);
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  const type = parseEntryType(object.type);

  switch (type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type,
        employerName: parseEmployerName(object.employerName),
        ...(isSickLeave(object.sickLeave) && {
          sickLeave: parseSickLeave(object.sickLeave),
        }),
      };

    default:
      return assertNever(type);
  }
};
