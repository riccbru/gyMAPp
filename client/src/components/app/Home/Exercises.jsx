import params from "@/lib/parameters";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function Exercises({ workoutExercises }) {

    return (
        <div className="flex flex-col items-center text-center justify-center">
            <div className="itemTitle">WORKOUT ({workoutExercises?.length ? params.getWeekdayName() : 'rest day'})</div>

            {
                !workoutExercises?.length ? null :
                workoutExercises.map((exercise, index) => (
                    <div key={index} className="mb-3">
                        <Accordion
                            type="multiple"
                            collapsible="false"
                            style={{width: '20rem'}}
                            >
                            <AccordionItem value={`accordion-item-exercise-${index + 1}`}>
                                <AccordionTrigger className='accordionTrigger'>
                                    <div className="ml-5 text-lg">Exercise {index + 1}</div>
                                </AccordionTrigger>
                                <AccordionContent className='accordionContent'>
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full text-white text-center">
                                            <thead>
                                                <tr>
                                                    {Object.keys(exercise).map((key) => (
                                                        <th key={key} className="px-1.5 py-2 font-bold text-blue-300">
                                                            {key.toUpperCase()}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="font-bold text-white dark:text-gray dark:hover:text-white">
                                                    {Object.values(exercise).map((value, idx) => (
                                                        <td
                                                            key={idx}
                                                            className="py-2"
                                                        >
                                                            {value !== null ? value.toString().toUpperCase() : '-'}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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