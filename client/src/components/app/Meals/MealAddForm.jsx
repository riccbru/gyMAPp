import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

function MealAddForm() {

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
        navigate("/meals");
    }
    
    return(
        <Card className='authnCard'>
            <CardContent>
                <form className="flex flex-col mt-2 w-80" onSubmit={handleSubmit}>

                    <Label className='mt-2 mb-1.5'>Weekday</Label>
                    <Input className='authnInput' />

                    <Label className='mt-2 mb-1.5'>Meal</Label>
                    <Input className='authnInput' />

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