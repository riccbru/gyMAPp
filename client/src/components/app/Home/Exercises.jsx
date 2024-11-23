import { getWeekday } from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function Exercises({ workoutExercises }) {
    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="homeTitle">WORKOUT</div>
            <div>{!workoutExercises?.length ? 'rest day' : ''}</div>

            {
                !workoutExercises?.length ? null :
                workoutExercises.map((exercise, index) => (
                    <div className="mb-3">
                        <Accordion
                            type="multiple"
                            collapsible="false"
                            style={{width: '30rem'}}
                            >
                            <AccordionItem value={`exercise-${index + 1}`}>
                                <AccordionTrigger className='accordionTrigger'>
                                    <div className="ml-5 text-lg">Exercise {index + 1}</div>
                                </AccordionTrigger>
                                <AccordionContent className='accordionContent'>
                                    <ul className="text-start">
                                        <>
                                            {/* CODE HERE, TABLE??? */}
                                        </>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                ))
            }
        </div>
    );
}

export { Exercises };