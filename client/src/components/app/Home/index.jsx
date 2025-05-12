'use strict';

import dayjs from "dayjs";
import API from "@/lib/API";
import { Options } from "./Options";
import params from "@/lib/parameters";
import { Exercises } from "./Exercises";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

function HomePanel() {

    const { isLogged } = useAuth();
    const [options, setOptions] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [currentTime, setCurrentTime] = useState({
      date: dayjs().format("dddd MM[/]DD[/]YYYY").toUpperCase(),
      time: dayjs().format("HH:mm:ss"),
    });

    useEffect(() => {
        if (isLogged) {
            const weekday = params.getWeekdayNum();
            const mealtype = params.getMealTypeNum();
            API.fetchMeal(weekday, mealtype)
                .then((res) => {
                  if (res.options !== undefined) {
                    setOptions(res.options);        
                  }
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(meal):\n${err}`);
                });
            API.fetchWorkout(weekday)
                .then((res) => {
                  if (res.exercises !== undefined) {
                    setExercises(res.exercises);    
                  }
                })
                .catch((err) => {
                    console.log(`HOME.index.useEffect(workout):\n${err}`);
                });
        } else {
          setOptions([]);
          setExercises([]);
        }

        const intervalId = setInterval(() => {
          const formattedDate = dayjs().format("dddd MM[/]DD[/]YYYY").toUpperCase();
          const formattedTime = dayjs().format("HH:mm:ss");
          setCurrentTime({ date: formattedDate, time: formattedTime });
        }, 1000);
        return () => clearInterval(intervalId);

    }, [isLogged]);


    return (
      <div className="flex flex-col">
        <div className="mt-10 mb-5 text-center font-extrabold text-3xl">HOME</div>
        <div className="mb-3 text-center font-extrabold text-xl">
          {currentTime.time}
          <br></br>
          {currentTime.date}
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

export { HomePanel };