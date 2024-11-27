'use strict';

import dayjs from "dayjs";
import API from "@/lib/API";
import { Options } from "./Options";
import { Exercises } from "./Exercises";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getWeekday, getMealType } from "@/lib/parameters";

function TestHome() {

    const { isLogged } = useAuth();
    const [options, setOptions] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (isLogged) {
          // const weekday = 5;
          // const mealtype = 5;
            const weekday = getWeekday();
            const mealtype = getMealType();
            API.meal(weekday, mealtype)
                .then((res) => {
                  if (res.options !== undefined) {
                    setOptions(res.options);        // array of JSONs
                  }
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(meal):\n${err}`);
                });
            API.workout(weekday)
                .then((res) => {
                  if (res.exercises !== undefined) {
                    setExercises(res.exercises);    // array of JSONs
                  }
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(workout):\n${err}`);
                });
        } else {
          setOptions([]);
          setExercises([]);
        }
    }, [isLogged]);


    return (
      <div className="flex flex-col">
        <div className="mt-10 mb-10 text-center font-extrabold text-2xl">
          {dayjs().format("dddd D MMMM YYYY[,] HH:mm:ss").toUpperCase()}
        </div>
        <div className="flex flex-row justify-between w-full mx-auto">

          <div className="flex-1 items-center text-center justify-center">
            <Options mealOptions={options} />
          </div>

          <div className="flex-1 items-center text-center justify-center">
            <Exercises workoutExercises={exercises} />
          </div>

        </div>
      </div>
    );
}

export { TestHome };