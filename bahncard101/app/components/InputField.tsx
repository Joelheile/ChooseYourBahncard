

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => (
  <div>
    <Label>{label}</Label>
    <Input
      type="number"
      pattern="[0-9]*"
      placeholder=""
      value={value}
      onChange={onChange}
    />
  </div>
);
