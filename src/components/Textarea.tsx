import { ComponentProps } from "react";
import { FieldProps } from "formik";

type TextareaProps = FieldProps &
  ComponentProps<"textarea"> & {
    label: string;
  };

function Textarea({
  className,
  label,
  field,
  form: { touched, errors },
  ...props
}: TextareaProps) {
  return (
    <div className={`block ${className}`}>
      <label
        htmlFor={props.id}
        className="block text-sm text-gray-600 font-semibold py-1"
      >
        {label}
      </label>
      <textarea
        className="w-full rounded-md shadow p-2 text-sm text-gray-900 placeholder-gray-400 ring-1 ring-gray-400 border-0 focus:ring-2 focus:ring-primary focus:outline-none"
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-600 text-sm">{errors[field.name]}</div>
      )}
    </div>
  );
}

export default Textarea;
