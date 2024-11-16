import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function InputField({ label, name, value, error, submit, onChange, placeholder, type = "text" }) {

  const getColor = (value, error, action) => {
    return !action ? (value ? (error ? '' : 'border-green') : (error ? 'border-red' : 'border-blue-700')) : 'border-blue-700';
  };

  return (
    <div>
      <Label htmlFor={name} className="mt-2 mb-1.5">{label}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        submit={submit}
        onChange={onChange}
        placeholder={placeholder}
        className={`authnInput ${getColor(value, error, submit)}`}
      />
    </div>
  );
};

export { InputField };