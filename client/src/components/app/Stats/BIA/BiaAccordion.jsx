import dayjs from "dayjs";
import { BiaRow } from "./BiaRow";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const beautyDate = (date) => {
    return dayjs(date).format("MMMM D[,] YYYY");
}

function BiaAccordion({ index, bia }) {

    return (
      <div>
        <AccordionItem value={`bia-${index}`}>
          <AccordionTrigger className="accordionTrigger">
            <div className="ml-5 font-bold text-lg">{index + 1}</div>
            <div>{beautyDate(bia.date)}</div>
          </AccordionTrigger>
          <AccordionContent>
            <Card className='biaCard'>
              <CardHeader></CardHeader>
              <CardContent>
                <TooltipProvider delayDuration={500}>
                  {Object.keys(bia).map((key) => {
                      if (key.toString().endsWith("_percentage") || key === "date") return null;
                      const percentage = `${key}_percentage`;
                      return (
                        <BiaRow
                          key={key}
                          bid={index+1}
                          name={key}
                          value={bia[key]}
                          percentage={bia[percentage]} 
                        />
                      );
                  })}
                </TooltipProvider>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
}

export { BiaAccordion };