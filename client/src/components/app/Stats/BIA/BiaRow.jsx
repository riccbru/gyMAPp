import biaMods from './biaMods';
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

function BiaRow({ name, value, percentage }) {

    return (
        <Tooltip key={`tooltip-${name}`}>
            <TooltipTrigger asChild>
                <div className="flex flex-row justify-between w-full text-lg">
                    <div className="basis-1/4 items-center text-start font-bold ml-6">
                            {biaMods.beautyName(name)}
                    </div>
                    <div className="basis-1/2 items-center text-center">
                        <div className="flex flex-row mx-auto">
                            <div>{value}</div>
                            <div className="ml-1 text-gray">{biaMods.beautyMetrics(name)}</div>
                            {percentage ? <div className="mx-auto text-gray">({percentage} %)</div> : ''}
                        </div>
                    </div>
                
                    <div className="basis-5/6 mr-3">
                        {!biaMods.metricBia[name]?.[1] ? null :
                            <img src={`/src/assets/bia/${name}.png`} className="w-70 h-11"/>}
                    </div>
                    
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" className='tooltipContent text-start'>
                <div className="font-bold text-md text-pretty text-white dark:text-primary">{biaMods.standardName(name)}</div>
                {name === "height" || name === "weight" ? null : <Separator orientation={'horizontal'} className="bg-gray" />}
                <div className="text-start break-words max-w-xs">{biaMods.metricBia[name]?.[0]}</div>
            </TooltipContent>

        </Tooltip>
    );
}

export { BiaRow };