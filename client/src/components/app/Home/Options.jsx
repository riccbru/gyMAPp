import { getWeekday } from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

const mealMap = {
    "1": "breakfast",
    "2": "morning snack",
    "3": "lunch",
    "4": "afternoon snack",
    "5": "dinner",
    "6": "midnight snack"
}

const beautyMealName = () => {
    const meal = mealMap[getWeekday()];
    return meal;
}

function Options({ mealOptions }) {

    
    

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="homeTitle">{beautyMealName()}</div>
            <div>{!mealOptions?.length ? `No meal options for ${beautyMealName()}` : ''}</div>

            {
                !mealOptions?.length ? null :
                mealOptions.map((option, index) => (
                    <div key={index} className="mb-3">
                        <Accordion
                            type="multiple"
                            collapsible="false"
                            style={{width: '30rem'}}
                            >
                            <AccordionItem value={`accordion-item-option-${index + 1}`}>
                                <AccordionTrigger className="accordionTrigger">
                                    <div className="ml-5 text-lg">Option {index + 1}</div>
                                </AccordionTrigger>
                                <AccordionContent className='accordionContent'>
                                    <ol className="text-start">
                                        {option?.map((opt) => (
                                            <>
                                                <li className="flex flex-row justify-between font-bold">
                                                    <div className="ingredient">{opt.ingredient.toString().toUpperCase()}</div>
                                                    <div className="quantity">{opt.quantity} g</div>
                                                </li>
                                            </>
                                        ))}
                                    </ol>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
            ))
            }
        </div>
    );
}

export { Options };