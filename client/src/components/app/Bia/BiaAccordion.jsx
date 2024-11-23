import dayjs from "dayjs";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BiaRow } from "./BiaRow";
import { TooltipProvider } from "@/components/ui/tooltip";

const beautyDate = (date) => {
    return dayjs(date).format("MMMM D[,] YYYY");
}

function BiaAccordion({ index, bia }) {

    return (
      <div>
        <AccordionItem value={`bia-${index}`}>
          <AccordionTrigger className="accordionTrigger">
            <div className="ml-5 font-bold text-lg">{index + 1}</div>
            <div className="">{beautyDate(bia.date)}</div>
          </AccordionTrigger>
          <AccordionContent className=''>
            <TooltipProvider delayDuration={500}>
                {Object.keys(bia).map((key) => {
                    if (key.toString().endsWith("_percentage") || key === "date") return null;
                    const percentage = `${key}_percentage`;
                    return (
                      <BiaRow
                        key={key}
                        name={key}
                        value={bia[key]}
                        percentage={bia[percentage]} 
                      />
                    );
                })}
            </TooltipProvider>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
}

export { BiaAccordion };