import { ComponentProps } from "react";
import { FieldProps } from "formik";

type InputProps = FieldProps &
  ComponentProps<"input"> & {
    label: string;
  };

const Input = ({
  className,
  label,
  field,
  form: { touched, errors },
  ...props
}: InputProps) => {
  return (
    <div className={`block ${className}`}>
      <label
        htmlFor={props.id}
        className="block text-sm text-gray-600 font-semibold py-1"
      >
        {label}
      </label>
      <input
        className=" w-full rounded-md shadow p-2 text-sm text-gray-900 placeholder-gray-300 ring-1 ring-gray-400 border-0 focus:ring-2 focus:ring-primary focus:outline-none"
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-600 text-sm">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default Input;
