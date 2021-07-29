import express from 'express';
import calculateBmi from './calculateBmi';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      throw new Error('malformatted parameters');
    }

    const bmi = calculateBmi(height, weight);

    const bmiResult = {
      height,
      weight,
      bmi,
    };

    res.json(bmiResult);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
