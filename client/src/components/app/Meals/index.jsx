import API from "@/lib/API";
import params from "@/lib/parameters";
import { useAuth } from "@/hooks/useAuth";
import { Options } from "../Home/Options";
import { useEffect, useState } from "react";
import { MealSelection } from "./MealSelection";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MealsPanel() {

    const { isLogged } = useAuth();
    const navigate = useNavigate();
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
                <div className="itemTitle">
                    <div className="flex flex-row items-center gap-x-10">
                        <CirclePlus className='hover:text-green cursor-pointer' onClick={() => navigate("/meal/new")} />
                        Search meals
                    </div>
                </div>
                <div className="flex flex-col items-center mx-auto space-y-5">
                    <MealSelection setMeal={setMeal} setWeekday={setWeekday}/>
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