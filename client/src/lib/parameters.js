"use strict";

import dayjs from "dayjs";

const weekMap = {
  '1': "monday",
  '2': "tuesday",
  '3': "wednesday",
  '4': "thursday",
  '5': "friday",
  '6': "saturday (treat-day)",
  '7': "sunday (treat-day)",
};

const mealMap = {
  '1': "breakfast",
  '2': "morning snack",
  '3': "lunch",
  '4': "afternoon snack",
  '5': "dinner",
  '6': "midnight snack"
};

const mealTimes = [
  { id: '1', min:  5, max:  10 },
  { id: '2', min: 10, max: 12 },
  { id: '3', min: 12, max: 15 },
  { id: '4', min: 15, max: 18.5 },
  { id: '5', min: 18.5, max: 22.5 },
  { id: '6', min: 22.5, max: 24 },
  { id: '6', min:  0, max:  5 },
];

const getWeekdayNum = () => {
    const weekday = dayjs().day().toString();
    if (weekday === '0') return '6'
    return weekday;
};

const getWeekdayName = () => {
  return weekMap[getWeekdayNum()];
};

const getAllWeekdayNames = () => {
  return Object.values(weekMap);
};

const getWeekdayNumByName = (name) => {
  if (name.startsWith('sunday')) return 6;
  return Object.entries(weekMap).find(([k, v]) => (v === name))?.[0]; 
}

const getMealTypeNum = () => {
  const currentHour = (dayjs().hour() + dayjs().minute() / 60).toFixed(1);
  // console.log(`currentHour = ${currentHour}`);

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
  return mealMap[getMealTypeNum()];
};

const getAllMealTypeNames = () => {
  return Object.values(mealMap);
};

const getMealTypeNumByName = (name) => {
  return Object.entries(mealMap).find(([k, v]) => (v === name))?.[0];
}

export default {
  getWeekdayNum, getWeekdayName, getAllWeekdayNames, getWeekdayNumByName,
  getMealTypeNum, getMealTypeName, getAllMealTypeNames, getMealTypeNumByName
};