import API from "@/lib/API";
import { Selects } from "./Selects";
import params from "@/lib/parameters";
import { useAuth } from "@/hooks/useAuth";
import { Options } from "../Home/Options";
import { useEffect, useState } from "react";

function MealsPanel() {

    const { isLogged } = useAuth();
    const [options, setOptions] = useState([]);
    const [meal, setMeal] = useState(params.getMealTypeNum());
    const [weekday, setWeekday] = useState(params.getWeekdayNum());

    useEffect(() => {
        if (isLogged) {
            API.fetchMeal(weekday, meal)
                .then((res) => {
                    if (res.options !== undefined) {
                        setOptions(res.options);
                    }
                })
                .catch((err) => {
                    console.log(`MEALS.index.useEffect(meal):\n${err}`);
                });
        } else {
            setOptions([]);
        }
    }, [meal, weekday]);

    return (
      <div className="flex flex-col">
        <div className="pageTitle">MEALS</div>
        <div className="pageDivider">
            
            <div className="itemDivided">
                <div className="itemTitle">Search meals</div>
                <div className="flex flex-col items-center mx-auto space-y-5">
                    <Selects setMeal={setMeal} setWeekday={setWeekday}/>
                </div>
            </div>
            <div className="itemDivided">
                    <Options mealOptions={options} />
            </div>
        </div>
      </div>
    );
}

export { MealsPanel };