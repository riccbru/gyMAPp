import { WorkoutParamSelect } from "./WorkoutParamSelect";
  
function WorkoutSelection({ setWeekday }) {

    return (
        <>
            <div className="flex flex-row mt-12">
                <div className="mt-2">Pick a day:</div>
                <div className="ml-3">
                    <WorkoutParamSelect setValue={setWeekday} />
                </div>
            </div>
        </>
    );
}

export { WorkoutSelection };