import dayjs from "dayjs";
import API from "@/lib/API";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getWeekday, getMealType } from "@/lib/parameters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TestHome() {

    const { isLogged } = useAuth();
    const [bia, setBia] = useState([]);
    const [meal, setMeal] = useState([]);
    const [workout, setWorkout] = useState([]);

    useEffect(() => {
        if (isLogged) {
            const weekday = getWeekday();
            const mealtype = getMealType();
            API.bia()
                .then((bia) => {
                    setBia(bia.BIAs);
                })
                .catch((err) => {
                    console.log(`index.useEffect(BIA):\n${err}`);
                });
            API.workout(weekday)
                .then((workout) => {
                    setWorkout(workout.workout);
                })
                .catch((err) => {
                    console.log(`index.useEffect(workout):\n${err}`);
                });
            API.meal(weekday, mealtype)
                .then((meal) => {
                    setMeal(meal.options);
                })
                .catch((err) => {
                    console.log(`index.useEffect(meal):\n${err}`);
                });
        }
    }, [isLogged]);

    return (
      <div className="flex flex-col">
        <div className="text-center font-extrabold text-2xl mt-10 mb-10">
          {dayjs().format("dddd D MMMM YYYY[,] HH:mm:ss").toUpperCase()}
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex-1 items-center text-center justify-center">
            <p className="text-xl">MEALS</p>
            <p>options</p>
          </div>
          <div className="flex-1 items-center text-center justify-center">
            <p className="text-xl">WORKOUT</p>
            <p>exercises</p>9
''          </div>
        </div>
      </div>
    );
}

export { TestHome };