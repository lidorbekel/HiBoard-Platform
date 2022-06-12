export function decodeTimeEstimation(timeEstimation: string) {
  let days;
  let hours;
  let minutes;
  let converted;

  if (timeEstimation.slice(0, 3).includes('.')) {
    converted = timeEstimation.split('.');
    days = converted[0];
    hours = converted[1].split(':')[0];
    minutes = converted[0].split(':')[1];
  } else {
    days = '0';
    converted = timeEstimation.split(':');
    hours = converted[0];
    minutes = converted[1];
  }

  // if (converted.length === 1) {
  //   days = 0;
  //   hours = converted[0].split(':')[0];
  //   hours = converted[0].split(':')[1];
  // } else {
  //   days = converted[0];
  //   hours = converted[1].split(':')[0];
  //   minutes = converted[1].split(':')[1];
  // }

  return {
    days,
    hours,
    minutes
  }
}
