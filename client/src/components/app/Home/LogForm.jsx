import dayjs from "dayjs";
import { useState } from "react";
import API from "@/lib/API";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField } from "../AuthN/InputField";
import { CircleMinus, CirclePlus } from "lucide-react";

function LogForm() {
  const { toast } = useToast();
  const [sets, setSets] = useState([0]);
  const defaultData = {
    exercise_name: "",
    weight: 0,
    rest: 120,
  };
  const [formData, setFormData] = useState(defaultData);
  const [errors, setErrors] = useState({
    exercise_name: false,
    sets: false,
    submit: false,
  });

  const showErrorToast = (field, title, message) => {
    setErrors((prev) => ({ ...prev, [field]: true, submit: true }));
    toast({
      duration: 3000,
      title: title,
      description: message,
      className: "toast",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false, submit: false }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRepChange = (index, value) => {
    setErrors((prev) => ({ ...prev, sets: false, submit: false }));
    const newSets = [...sets];
    newSets[index] = parseInt(value) || 0;
    setSets(newSets);
  };

  const addSet = () => setSets([...sets, 0]);
  const removeSet = () => sets.length > 1 && setSets(sets.slice(0, -1));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ exercise_name: false, sets: false, submit: false });

    if (!formData.exercise_name) {
      showErrorToast(
        "exercise_name",
        "MISSING DATA",
        "Exercise name is required"
      );
      return;
    }

    if (sets.some((rep) => rep <= 0)) {
      showErrorToast("sets", "INVALID REPS", "Please enter reps for all sets");
      return;
    }

    try {
      const logData = {
        ...formData,
        sets: sets.length,
        reps: sets,
        date: dayjs().format("YYYY-MM-DD"),
      };

      await API.pushLog(logData);

      toast({
        title: "SUCCESS",
        description: "Session logged successfully",
        className: "toast !border-green",
      });

      setFormData(defaultData);
      setSets([0]);
    } catch (err) {
      console.error(err);
      showErrorToast(
        "submit",
        "SAVE FAILED",
        err.message || "Could not save log"
      );
    }
  };

  return (
    <div className="itemDivided">
      <Card
        className={`logCard !w-full ${!errors.submit ? "" : "!border-red"}`}
      >
        <CardHeader>
          <CardTitle className="text-center">
            <div className={`mx-auto itemTitle ${!errors.submit ? "" : "text-red"}`}>
              LOG HOME WORKOUT
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className={`labelStyle ${ errors.exercise_name ? "text-red" : "text-slate-400" }`}>Exercise Name</label>
            <InputField
              name="exercise_name"
              onChange={handleInputChange}
              error={errors.exercise_name}
              value={formData.exercise_name}
              placeholder="e.g. Pull ups"
            />

            <div className="flex space-x-4 justify-center w-full">
              <div className="flex flex-col space-y-1 ">
      <label className={`labelStyle ${ errors.weight ? "text-red" : "text-slate-400" }`}>Weight (kg)</label>
      <InputField
        name="weight"
        label=""
        type="number"
        onChange={handleInputChange}
        value={formData.weight}
      />
    </div>
              <div className="flex flex-col space-y-1 ">
      <label className={`labelStyle ${ errors.rest ? "text-red" : "text-slate-400" }`}>Rest (sec)</label>
      <InputField
        name="rest"
        label=""
        type="number"
        onChange={handleInputChange}
        value={formData.rest}
      />
    </div>
            </div>


            <div className="flex flex-col space-y-6 py-4">
              {/* SET CONTROLLER */}
              <div className="flex flex-col items-center space-y-3">
                <label
                  className={`labelStyle ${ errors.sets ? "text-red" : "text-slate-400" }`}
                >
                  Sets Number
                </label>

                <div className="flex items-center space-x-6 bg-slate-900/80 p-2 px-4 rounded-full border border-slate-700 shadow-inner">
                  <button
                    type="button"
                    onClick={removeSet}
                    className="text-slate-400 hover:text-red transition-colors p-1"
                  >
                    <CircleMinus size={20} strokeWidth={3} />
                  </button>

                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-white text-background shadow-lg">
                    <span className="text-xl font-black leading-none">
                      {sets.length}
                    </span>
                    <span className="text-[8px] uppercase font-bold">Sets</span>
                  </div>

                  <button
                    type="button"
                    onClick={addSet}
                    className="text-slate-400 hover:text-green transition-colors p-1"
                  >
                    <CirclePlus size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* REPS INPUTS */}
              <div className="flex flex-wrap gap-3 justify-center">
                {sets.map((rep, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center animate-in fade-in zoom-in duration-300"
                  >
                    <div className="text-[10px] font-bold text-slate-500 mb-1">
                      SET {index + 1}
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        className={`w-14 h-14 bg-slate-900/50 border-2 rounded-xl text-center text-lg font-black outline-none transition-all
              ${
                errors.sets
                  ? "border-red text-red"
                  : "border-slate-700 focus:border-green text-white"
              }`}
                        value={rep}
                        onChange={(e) => handleRepChange(index, e.target.value)}
                        onFocus={(e) => e.target.select()} // Auto-select text on click
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-5 !bg-white text-background rounded-3xl hover:rounded-xl transition-all duration-200"
            >
              SAVE LOG
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export { LogForm };
