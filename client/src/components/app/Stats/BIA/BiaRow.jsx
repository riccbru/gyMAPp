import biaMods from "./biaMods";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function BiaRow({ name, value, percentage }) {
    return (
        <Tooltip key={`tooltip-${name}`}>

            <TooltipTrigger asChild>
                <div className="flex flex-row text-lg">
                    <div className="basis-1/3 ml-3 text-start font-bold">
                        {biaMods.beautyName(name)}
                    </div>

                    <div className="basis-1/3 text-center">
                        <div className="flex flex-row">
                            <div>{value}</div>
                            <div className="ml-0.5 text-left text-gray">
                                {biaMods.beautyMetrics(name)}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 text-center">
                        {percentage && (
                            <div className=" text-gray font-bold">({percentage} %)</div>
                        )}
                    </div>
                </div>
            </TooltipTrigger>

            <TooltipContent side="left" className="tooltipContent text-start">
                <div className="font-bold text-md text-pretty text-white dark:text-primary">
                    {biaMods.standardName(name)}
                </div>
                {name === "height" || name === "weight" ? null : (
                    <Separator orientation={"horizontal"} className="bg-gray" />
                )}
                <div className="text-start break-words max-w-xs">
                    {biaMods.metricBia[name]?.[0]}
                </div>
            </TooltipContent>

        </Tooltip>
    );
}

export { BiaRow };
