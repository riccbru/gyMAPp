import params from "@/lib/parameters";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
  
function Selects({ setMeal, setWeekday }) {

    return (
        <>
            <div className="flex flex-row">
                <div className="mt-2 mr-5">Pick a day:</div>
                <div className="ml-4">
                    <Select
                        onValueChange={(e) => {setWeekday(params.getWeekdayNumByName(e.toString().toLowerCase()))}}
                    >
                        <SelectTrigger className="w-48 rounded-full bg-panna text-primary hover:bg-white">
                          <SelectValue placeholder={params.getWeekdayName()} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl bg-primary">
                            <SelectGroup>
                                {params.getAllWeekdayNames()?.map((weekdayName, index) => (
                                    <SelectItem
                                        key={index}
                                        value={weekdayName}
                                        className="bg-primary text-white"
                                    >
                                        {weekdayName.charAt(0).toUpperCase() + weekdayName.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col items-center mx-auto space-y-5">
                <div className="flex flex-row">
                    <div className="mt-2 mr-5">Pick a meal:</div>
                    <div className="ml-2">
                        <Select
                            onValueChange={(e) => {setMeal(params.getMealTypeNumByName(e.toString().toLowerCase()))}}
                        >
                            <SelectTrigger className="w-48 rounded-full bg-panna text-primary hover:bg-white">
                                <SelectValue placeholder={params.getMealTypeName()} />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl bg-primary">
                                <SelectGroup>
                                    {params.getAllMealTypeNames()?.map((mealName, index) => (
                                        <SelectItem
                                            key={index}
                                            value={mealName}
                                            className="bg-primary text-white"
                                        >
                                            {mealName.charAt(0).toUpperCase() + mealName.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Selects };