"use strict";

import dayjs from "dayjs";

const getWeekday = () => {
    const weekday = dayjs().day().toString();
    // console.log(`weekday(${typeof(weekday)}) = ${weekday}`);
    if (weekday === '0') return '6'
    return weekday;
};

const getMealType = () => {
  const currentHour = (dayjs().hour() + dayjs().minute() / 60).toFixed(1);
  // console.log(`currentHour = ${currentHour}`);
  
  const mealTimes = [
    { id: '6', min:  0, max:  2 },
    { id: '6', min:  2, max:  5 },
    { id: '1', min:  5, max:  10 },
    { id: '2', min: 10, max: 12 },
    { id: '3', min: 12, max: 15 },
    { id: '4', min: 15, max: 18.5 },
    { id: '5', min: 18.5, max: 22 },
    { id: '6', min: 22, max: 23.9 },
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

export { getWeekday, getMealType };