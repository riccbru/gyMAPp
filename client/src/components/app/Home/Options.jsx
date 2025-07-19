import params from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";


function Options({ mealOptions }) {

    const mealName = params.toTitleCase(params.getMealTypeName());

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="itemTitle">MEALS</div>
            {
                !mealOptions?.length ? null :
                mealOptions.map((option, index) => (
                    <div key={index} className="mb-3">
                        <Accordion
                            type="multiple"
                            collapsible="false"
                            style={{width: '20rem'}}
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
