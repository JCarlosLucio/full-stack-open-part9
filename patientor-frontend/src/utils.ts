import { Gender, GenderIcon } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isValidDate = (str: string) => {
  const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
  return regex.test(str);
};

export const getGenderIcon = (gender: Gender): GenderIcon => {
  switch (gender) {
    case Gender.Male:
      return GenderIcon.Male;
    case Gender.Female:
      return GenderIcon.Female;
    default:
      return GenderIcon.Other;
  }
};
