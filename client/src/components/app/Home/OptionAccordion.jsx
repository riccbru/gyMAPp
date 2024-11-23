import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

function OptionAccordion({ index, mealOption }) {
    return (
      <Accordion type="multiple" collapsible="false" style={{ width: "30rem" }}>
        <AccordionItem value={`accordion-item-option-${index + 1}`}>
          <AccordionTrigger className="accordionTrigger">
            <div className="ml-5 text-lg">Option {index + 1}</div>
          </AccordionTrigger>
          <AccordionContent className="accordionContent">
            <ul className="text-start">
              {mealOption?.map((opt, ind) => (
                <div key={`ul-option-${ind + 1}`}>
                  <li className="liOption">
                    <div className="ingredient">
                      {opt.ingredient.toString().toUpperCase()}
                    </div>
                    <div className="quantity">
                      {opt.quantity} g
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
}

export { OptionAccordion };