interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
