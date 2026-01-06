import { MealAddForm } from "@/components/app/Meals/MealAddForm";

function NewMeal() {
    return(
        <div className="flex flex-col">
            <div className="pageTitle">
                New MEAL
            </div>
            <div className="flex items-center justify-center">
                <MealAddForm />
            </div>
        </div>
    );
}

export { NewMeal };