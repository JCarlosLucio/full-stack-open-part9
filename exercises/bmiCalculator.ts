type BmiResult =
  | 'Invalid bmi value'
  | 'Underweight (severe thinness)'
  | 'Underweight (moderate thinness)'
  | 'Underweight (mild thinness)'
  | 'Normal (healthy weight)'
  | 'Overweight (pre-obese)'
  | 'Obese (class I)'
  | 'Obese (class II)'
  | 'Obese (class III)';

const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / (height / 100) ** 2;

  switch (true) {
    case bmi < 16:
      return 'Underweight (severe thinness)';
    case 16 <= bmi && bmi < 17:
      return 'Underweight (moderate thinness)';
    case 17 <= bmi && bmi < 18.5:
      return 'Underweight (mild thinness)';
    case 18.5 <= bmi && bmi < 24.9:
      return 'Normal (healthy weight)';
    case 25 <= bmi && bmi < 30:
      return 'Overweight (pre-obese)';
    case 30 <= bmi && bmi < 35:
      return 'Obese (class I)';
    case 35 <= bmi && bmi < 40:
      return 'Obese (class II)';
    case 40 <= bmi:
      return 'Obese (class III)';

    default:
      return 'Invalid bmi value';
  }
};

console.log(calculateBmi(180, 74));
