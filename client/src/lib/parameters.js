"use stric";

import dayjs from "dayjs";

// const minBreakfast = 7;
// const maxBreakfast = 9;
// const minMorningSnack = 10;
// const maxMorningSnack = 12;
// const minLunch = 12;
// const maxLunch = 14;
// const minAfternoonSnack = 16;
// const maxAfternoonSnack = 18;
// const minDinner = 20;
// const maxDinner = 22;
// const minMidnightSnack = 23;
// const maxMidnightSnack = 1;

const getWeekday = () => {
    const weekday = dayjs().day().toString(); 
    return weekday;
};

const getMealType = () => {

    const currentHour = dayjs().hour() + dayjs().minute() / 60;

    const mealTimes = [
        { id: 1, min:  7, max:  9 },  
        { id: 2, min: 10, max: 11 },
        { id: 3, min: 12, max: 15 },
        { id: 4, min: 16, max: 18 },  
        { id: 5, min: 19, max: 22 },    
        { id: 6, min: 23, max: 26 },  
      ];

    const meal = mealTimes.find(({ min, max }) => {
      const adjustedHour = currentHour < min ? currentHour + 24 : currentHour;
      return adjustedHour >= min && adjustedHour <= max;
    });

    return meal ? meal.id : 0;
};

export { getWeekday, getMealType };