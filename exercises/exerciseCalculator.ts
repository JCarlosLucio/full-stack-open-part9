import calculateExercises from './calculateExercises';

interface ExercisesValues {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): ExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [, , target, ...hours] = args;

  if (!isNaN(Number(target)) && hours.every((hour) => !isNaN(Number(hour)))) {
    return {
      target: Number(target),
      hours: hours.map((hour) => Number(hour)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message:', e.message);
  }
}
