import { getWeekday } from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function Exercises({ workoutExercises }) {

    const workoutMap = {
        "0": "sunday",
        "1": "monday",
        "2": "tuesday",
        "3": "wednesday",
        "4": "thursday",
        "5": "friday",
        "6": "saturday"
    }
    const beautyWorkoutDay = () => {
        return workoutMap[getWeekday()];
    }

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="homeTitle">WORKOUT ({workoutExercises?.length ? beautyWorkoutDay() : 'REST DAY'})</div>

            {
                !workoutExercises?.length ? null :
                workoutExercises.map((exercise, index) => (
                    <div key={index} className="mb-3">
                        <Accordion
                            type="multiple"
                            collapsible="false"
                            style={{width: '30rem'}}
                            >
                            <AccordionItem value={`accordion-item-exercise-${index + 1}`}>
                                <AccordionTrigger className='accordionTrigger'>
                                    <div className="ml-5 text-lg">Exercise {index + 1}</div>
                                </AccordionTrigger>
                                <AccordionContent className='accordionContent'>
                                    <ul className="text-start">
                                        <li className="flex flex-row justify-between font-bold">
                                            <div className="ml-5">{exercise.name}</div>
                                        </li>
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