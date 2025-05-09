import API from "@/lib/API";
import params from "@/lib/parameters";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Exercises } from "../Home/Exercises";
import { WorkoutSelection } from "./WorkoutSelection";

function WorkoutsPanel() {

  const { isLogged } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [weekday, setWeekday] = useState(params.getWeekdayNum());

  useEffect(() => {
    if (isLogged) {
      API.fetchWorkout(weekday)
        .then((res) => {
          if (res.exercises !== undefined) {
            setExercises(res.exercises);
          } else {
            setExercises([]);
          }
        })
        .catch((err) => {
          console.log(`HOME.index.useEffect(workout):\n${err}`);
        });
    } else {
      setExercises([]);
    }
  }, [weekday]);

  return (
    <div className="flex flex-col">
      <div className="pageTitle">WORKOUTS</div>
      <div className="pageDivider">
        <div className="itemDivided">
          <div className="itemTitle">Search workouts</div>
          <div className="flex flex-col items-center mx-auto space-y-5">
            <WorkoutSelection setWeekday={setWeekday} />
          </div>
        </div>
        <div className="itemDivided">
          <Exercises workoutExercises={exercises} />
        </div>
      </div>
    </div>
  );
}

export { WorkoutsPanel };