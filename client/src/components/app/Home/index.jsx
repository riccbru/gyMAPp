'use strict';

import dayjs from "dayjs";
import API from "@/lib/API";
import { Options } from "./Options";
import params from "@/lib/parameters";
import { Exercises } from "./Exercises";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

function TestHome() {

    const { isLogged } = useAuth();
    const [options, setOptions] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (isLogged) {
          // const weekday = 5;
          // const mealtype = 5;
            const weekday = params.getWeekdayNum();
            const mealtype = params.getMealTypeNum();
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
        <div className="pageTitle">
          {dayjs().format("dddd D MMMM YYYY[,] HH:mm:ss").toUpperCase()}
        </div>
        <div className="pageDivider">

          <div className="itemDivided">
            <Options mealOptions={options} />
          </div>

          <div className="itemDivided">
            <Exercises workoutExercises={exercises} />
          </div>

        </div>
      </div>
    );
}

export { TestHome };