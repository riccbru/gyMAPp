import { getMealType, getWeekday } from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";


function Options({ mealOptions }) {
    
    const mealMap = {
        '1': "breakfast",
        '2': "morning snack",
        '3': "lunch",
        '4': "afternoon snack",
        '5': "dinner",
        '6': "midnight snack"
    };
    
    const beautyMealName = () => {
        return mealMap[getMealType()];
    }

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="homeTitle">MEALS ({mealOptions?.length ? beautyMealName() : 'TREAT DAY'})</div>

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
                                        {option?.map((opt, ind) => (
                                            <div key={ind}>
                                                <li className="liOption">
                                                    <div className="ingredient">{opt.ingredient.toString().toUpperCase()}</div>
                                                    <div className="quantity">{opt.quantity} g</div>
                                                </li>
                                            </div>
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