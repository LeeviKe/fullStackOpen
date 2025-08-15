export function calculateBmi(height: number, weight: number) {
  const bmi: number = (weight / (height * height)) * 10000;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  }
  if (bmi >= 16 && bmi < 17) {
    return 'Underweight (Moderate thinness)';
  }
  if (bmi >= 17 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  }
  if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range';
  }
  if (bmi >= 25 && bmi < 30) {
    return 'Overweight (Pre-obese)';
  }
  if (bmi >= 30 && bmi < 35) {
    return 'Obese (Class I)';
  }
  if (bmi >= 35 && bmi < 40) {
    return 'Obese (Class II)';
  }
  return 'Obese (Class III)';
}

const heightInput = Number(process.argv[2]);
const weightInput = Number(process.argv[3]);

console.log(calculateBmi(heightInput, weightInput));
