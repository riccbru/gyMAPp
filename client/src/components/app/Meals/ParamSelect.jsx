import params from "@/lib/parameters";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function ParamSelect({ type, setValue }) {
    const isWeekday = type === "weekday";

    const placeholder = isWeekday
        ? params.getWeekdayName()
        : params.getMealTypeName();

    const options = isWeekday
        ? params.getAllWeekdayNames()
        : params.getAllMealTypeNames();
    
    const handleValueChange = (e) => {
        const setterFunction = isWeekday
            ? params.getWeekdayNumByName
            : params.getMealTypeNumByName;
        setValue(setterFunction(e.toString().toLowerCase()));
    };

    const formatValue = (name) => name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <Select onValueChange={handleValueChange} defaultValue={placeholder}>
            <SelectTrigger className="w-48 rounded-full bg-panna text-primary hover:bg-white">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl bg-primary">
                <SelectGroup>
                    {options?.map((name, index) => (
                        <SelectItem key={index} value={name} className="selectItem">
                            {formatValue(name)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export { ParamSelect };