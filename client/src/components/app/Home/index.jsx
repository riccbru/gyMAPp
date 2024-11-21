import dayjs from "dayjs";
import API from "@/lib/API";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getWeekday, getMealType } from "@/lib/parameters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TestHome() {

    const { isLogged } = useAuth();
    const [meal, setMeal] = useState([]);
    const [workout, setWorkout] = useState([]);

    useEffect(() => {
        if (isLogged) {
            const weekday = getWeekday();
            const mealtype = getMealType();
            API.workout(weekday)
                .then((res) => {
                    setWorkout(res.exercises);
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(workout):\n${err}`);
                });
            API.meal(weekday, mealtype)
                .then((res) => {
                    setMeal(res.options);
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(meal):\n${err}`);
                });
        }
    }, [isLogged]);

    return (
      <div className="flex flex-col">
        <div className="mt-10 mb-10 text-center font-extrabold text-2xl">
          {dayjs().format("dddd D MMMM YYYY[,] HH:mm:ss").toUpperCase()}
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="flex-1 items-center text-center justify-center">
            <p className="text-xl">MEALS {meal ? 'SET' : 'UNSET'}</p>
            <p>options: {meal?.length}</p>
          </div>
          <div className="flex-1 items-center text-center justify-center">
            <p className="text-xl">WORKOUT {workout ? 'SET' : 'UNSET'}</p>
            <p>exercises: {workout?.length}</p>
          </div>
        </div>
      </div>
    );
}

export { TestHome };