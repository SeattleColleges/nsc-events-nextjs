import React, { ChangeEventHandler } from "react";
// TODO: Clean this up
// TODO see which CSS framework are we using
interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
  togglePasswordVisibility?: () => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required,
  icon,
  togglePasswordVisibility,
}) => {
  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block mb-1 font-semibold">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={name}
          className={`w-full px-4 py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500 text-black pr-10`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
        {icon && (
          <div className="absolute inset-y-0 right-1 pr-3 flex items-center text-sm leading-5">
            <span onClick={togglePasswordVisibility} className="cursor-pointer">
              {icon}
            </span>
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
