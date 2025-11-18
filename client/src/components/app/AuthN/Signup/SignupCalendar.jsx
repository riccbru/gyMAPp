import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignupCalendar({ birthdate, handleChange, error }) {
    
    const getColor = (birthdate, error) => {
      return !error ? (birthdate ? "!bg-green" : "") : "!bg-red";
    };

    const formattedDate = birthdate;

    return (
        <>
            <Label
                htmlFor={"date"}
                className={`mt-2 mb-1.5 ${!error ? '' : 'text-red'}`}
            >
                {"Birthdate"}
            </Label>
            <input
                type="date"
                name="birthdate"
                value={formattedDate}
                onChange={handleChange}
                className={`signupCalendar ${getColor(birthdate, error)}`}
            />
        </>
    );
}

export { SignupCalendar };