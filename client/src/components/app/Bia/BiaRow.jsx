import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

const standardName = (entry) => {
    return entry.split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
}

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
            <TooltipTrigger asChild>
                <div className="flex flex-row justify-between w-full text-lg">
                    <div className="basis-1/4 items-center text-start font-bold ml-6">
                            {beautyName(name.toString())}
                    </div>
                    <div className="basis-1/4 items-center text-center">
                        <div>{value}</div>
                        <div className="text-gray">{percentage ? `(${percentage} %)` : ''}</div>
                    </div>
                    <div className="basis-1/7 items-center text-center text-gray mr-3">smthng</div>
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" className='tooltipContent text-start text-pretty'>
                <div className="text-md text-pretty text-gray">{standardName(name)}</div>
            </TooltipContent>
        </Tooltip>
    );
}

export { BiaRow };