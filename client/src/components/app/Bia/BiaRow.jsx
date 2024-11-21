import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

const beautyName = (entry) => {
    if (!entry.includes("_")) {
        return entry.toUpperCase();
    }
    if (entry.length <= 3) return entry.toUpperCase()
    return entry.split("_")
                .map((word) => word.charAt(0).toUpperCase())
                .join("");
    
}

function BiaRow({ name, value, percentage }) {
    return (
        <Tooltip key={`tooltip-${name}`}>
        <div className="flex flex-row justify-between w-full text-lg">
            <div className="basis-1/4 items-center text-start font-bold ml-6">
                <TooltipTrigger>
                    {beautyName(name.toString())}
                </TooltipTrigger>
            </div>
            <div className="basis-1/4 items-center text-center">{value}</div>
            <div className="basis-1/2 items-center text-center text-gray mr-3">{percentage ? `${percentage} %` : ''}</div>
        </div>
        <TooltipContent side="left" className='tooltipContent text-start text-pretty'>
            <p className="text-lg">ACRONYM TITLE</p>
            <div className="text-md text-pretty">acronym description one two three four five six seven eight nine ten eleven twelve thirteen fourten fifteen</div>
        </TooltipContent>
        </Tooltip>
    );
}

export { BiaRow };