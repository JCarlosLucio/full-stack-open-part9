import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  const bmiResult = {
    height,
    weight,
    bmi,
  };

  return res.json(bmiResult);
});

interface ExercisesReqBody {
  target: number;
  daily_exercises: Array<number>;
}

app.post('/exercises', (req, res) => {
  const { target, daily_exercises: hours } = req.body as ExercisesReqBody;

  if (!target || !hours) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (isNaN(Number(target)) || hours.some((hour) => isNaN(Number(hour)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, hours);

  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
