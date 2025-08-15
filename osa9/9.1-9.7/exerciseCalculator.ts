interface stats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(target: number, data: number[]) {
  const dailyTargetExerciseTime = target;

  let trainingDays = 0;
  for (const days of data) {
    if (days !== 0) {
      trainingDays++;
    }
  }

  let totalExerciseTime = 0;
  for (const days of data) {
    totalExerciseTime = totalExerciseTime + days;
  }
  const averageDailyExerciseTime = totalExerciseTime / data.length;

  let success = false;
  let rating = 1;
  let ratingDescription = '';

  if (averageDailyExerciseTime > dailyTargetExerciseTime) {
    success = true;
    rating = 3;
    ratingDescription = 'Amazing work!';
  } else if (averageDailyExerciseTime > dailyTargetExerciseTime * 0.3) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Awful work.. Step up!';
  }

  const statistics: stats = {
    periodLength: data.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTargetExerciseTime,
    average: averageDailyExerciseTime,
  };

  return statistics;
}

const target = Number(process.argv[2]);
const exerciseData: number[] = process.argv.slice(3).map(Number);

console.log(calculateExercises(target, exerciseData));
