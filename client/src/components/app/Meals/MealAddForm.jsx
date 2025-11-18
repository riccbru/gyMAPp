import { useState } from "react";
import params from "@/lib/parameters";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MealParamSelect } from "./MealParamSelect";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function MealAddForm() {

    const navigate = useNavigate();
    const [meal, setMeal] = useState(params.getMealTypeNum());
    const [weekday, setWeekday] = useState(params.getWeekdayNum());

    const handleSubmit = (e) => {
        e.preventDefault();
        const mealName = params.getAllMealTypeNames()[meal - 1];
        const weekdayName = params.getAllWeekdayNames()[weekday - 1];
        console.log(`MEAL:\t${mealName}\nDAY:\t${weekdayName}`);
        // navigate("/meals");
    }
    
    return(
        <Card className='authnCard'>
            <CardContent>
                <form className="flex flex-col mt-2 w-full" onSubmit={handleSubmit}>

                    <Label className='mt-2 mb-1.5'>Weekday</Label>
                    <MealParamSelect type='weekday' setValue={setWeekday} />

                    <Label className='mt-2 mb-1.5'>Meal</Label>
                    <MealParamSelect type='meal' setValue={setMeal} />

                    <Button type="submit" className="mt-5 !bg-white text-background rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear cursor-pointer">
                        ADD
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
                <Button className='mt-3 bg-red hover:bg-red rounded-xl' onClick={() => navigate("/meals")}>CANCEL</Button>
            </CardFooter>
        </Card>
    );
}

export { MealAddForm };