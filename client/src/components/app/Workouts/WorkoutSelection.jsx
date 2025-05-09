import { WorkoutParamSelect } from "./WorkoutParamSelect";
  
function WorkoutSelection({ setWeekday }) {

    return (
        <>
            <div className="flex flex-row">
                <div className="mt-2 mr-5">Pick a day:</div>
                <div className="ml-4">
                    <WorkoutParamSelect setValue={setWeekday} />
                </div>
            </div>
        </>
    );
}

export { WorkoutSelection };