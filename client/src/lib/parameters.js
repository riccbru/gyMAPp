"use stric";

import dayjs from "dayjs";

const getWeekday = () => {
    const weekday = dayjs().day().toString(); 
    return weekday;
};

const getMealType = () => {

    const currentHour = (dayjs().hour() + dayjs().minute() / 60).toFixed(1);

    const mealTimes = [
        { id: 1, min:  7, max:  10 },  
        { id: 2, min: 10, max: 12 },
        { id: 3, min: 12, max: 15 },
        { id: 4, min: 15, max: 18 },  
        { id: 5, min: 18, max: 22 },    
        { id: 6, min: 22, max: 31 },  
      ];

    const meal = mealTimes.find(({ min, max }) => {
      const adjustedHour = currentHour < min ? currentHour + 24 : currentHour;
      return adjustedHour >= min && adjustedHour < max;
    });

    return meal ? meal.id : 0;
};

export { getWeekday, getMealType };