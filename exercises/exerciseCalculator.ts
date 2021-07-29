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

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((acc, cur) => acc + cur, 0) / hours.length;
  const success = average >= target;
  const rating: 1 | 2 | 3 =
    average >= target ? 3 : average >= target * 0.5 ? 2 : 1;

  const RATING_DESCRIPTIONS = {
    1: 'bad',
    2: 'not too bad but could be better',
    3: 'good job',
  };
  const ratingDescription = RATING_DESCRIPTIONS[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (e) {
  console.log('Error, something bad happened, message:', e.message);
}
