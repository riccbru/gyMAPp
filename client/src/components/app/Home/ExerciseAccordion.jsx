import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function ExerciseAccordion({ workoutExercise, index }) {
    return (
      <Accordion type="multiple" collapsible="false" style={{ width: "30rem" }}>
        <AccordionItem value={`accordion-item-exercise-${index + 1}`}>
          <AccordionTrigger className="accordionTrigger">
            <div className="ml-5 text-lg">Exercise {index + 1}</div>
          </AccordionTrigger>
          <AccordionContent className="accordionContent">
            <ul className="text-start">
              {workoutExercise?.map((exe, ind) => (
                <>{/* EXERCISES HERE, MAYBE TABLE??? */}</>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
}

export { ExerciseAccordion };