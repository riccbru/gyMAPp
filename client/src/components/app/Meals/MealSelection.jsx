import { MealParamSelect } from "./MealParamSelect";
  
function MealSelection({ setMeal, setWeekday }) {

    return (
        <>
            <div className="flex flex-row">
                <div className="mt-2 mr-5">Pick a day:</div>
                <div className="ml-4">
                    <MealParamSelect type="weekday" setValue={setWeekday} />
                </div>
            </div>
            <div className="flex flex-col items-center mx-auto space-y-5">
                <div className="flex flex-row">
                    <div className="mt-2 mr-5">Pick a meal:</div>
                    <div className="ml-2">
                        <MealParamSelect type="meal" setValue={setMeal} />
                    </div>
                </div>
            </div>
        </>
    );
}

export { MealSelection };