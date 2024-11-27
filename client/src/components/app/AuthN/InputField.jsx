import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InputField({ label, name, value, error, submit, onChange, placeholder, type = "text" }) {

  const getColor = (value, error) => {
    return !error ? (value ? '!bg-green' : '') : '!bg-red';
  };

  return (
    <div>
      <Label
      htmlFor={name}
      className={`mt-2 mb-1.5 ${!error ? '' : 'text-red'}`}
      >
        {label}
        </Label>
      <Input
        type={type}
        name={name}
        value={value}
        submit={submit}
        onChange={onChange}
        placeholder={placeholder}
        className={`authnInput ${submit ? getColor(value, error) : ''}`}
      />
    </div>
  );
};

export { InputField };