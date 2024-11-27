"use strict";

import dayjs from "dayjs";

const getWeekdayNum = () => {
    const weekday = dayjs().day().toString();
    if (weekday === '0') return '6'
    return weekday;
};

const getWeekdayName = () => {
  const weekMap = {
      '0': 'sunday',
      '1': 'monday',
      '2': 'tuesday',
      '3': 'wednesday',
      '4': 'thursday',
      '5': 'friday',
      '6': 'saturday',
  }
  return weekMap[getWeekdayNum()];
};

const getMealTypeNum = () => {
  const currentHour = (dayjs().hour() + dayjs().minute() / 60).toFixed(1);
  // console.log(`currentHour = ${currentHour}`);
  
  const mealTimes = [
    { id: '1', min:  5, max:  10 },
    { id: '2', min: 10, max: 12 },
    { id: '3', min: 12, max: 15 },
    { id: '4', min: 15, max: 18.5 },
    { id: '5', min: 18.5, max: 22 },
    { id: '6', min: 22, max: 23.9 },
    { id: '6', min:  0, max:  2 },
    { id: '6', min:  2, max:  5 },
  ];

  const meal = mealTimes.find(({ min, max }) => {
    if (min < max) {
        return currentHour >= min && currentHour < max;
    } else {
        return currentHour >= min || currentHour < max;
    }
  });
  return meal ? meal.id : 0;
};

const getMealTypeName = () => {
  const mealMap = {
    '1': "breakfast",
    '2': "morning snack",
    '3': "lunch",
    '4': "afternoon snack",
    '5': "dinner",
    '6': "midnight snack"
};
  return mealMap[getMealTypeNum()];
};

export default { getWeekdayNum, getWeekdayName, getMealTypeNum, getMealTypeName };