import { Eye, EyeOff } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function PasswordField({ label, name, value, submit, onChange, error, onToggleShow, showPassword }) {
  const getColor = (data, err, action) => {
    return !action ? (value ? (error ? '' : 'border-green') : (error ? 'border-red' : 'border-blue-700')) : 'border-blue-700';
  };
  return (
    <div>
        <Label
        htmlFor={name}
        className={`mt-2 mb-1.5 ${!error ? '' : 'text-red'}`}
        >
          {label}
          </Label>
        <div className="flex justify-between items-center w-full text-background">
            <Input
              name={name}
              value={value}
              submit={submit}
              onChange={onChange}
              type={showPassword ? "text" : "password"}
              className={`authnInput ${getColor(value, error, submit)} ${!error ? (value.length > 7 ? '!bg-green' : '') : '!bg-red'}`}
            />
            <div className="showButton" onClick={onToggleShow}>
                {showPassword ? <Eye /> : <EyeOff />}
            </div>
        </div>
    </div>
  );
};

export { PasswordField };