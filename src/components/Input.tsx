import { ComponentProps, createElement } from "react";
import { useController, UseControllerProps } from "react-hook-form";

type InputType = "input" | "textarea";

type InputProps<T extends InputType> = UseControllerProps<any> &
  ComponentProps<T> & {
    label: string;
    component: T;
  };

const Input = <T extends InputType>({
  component,
  label,
  className,
  name,
  control,
  rules,
  ...props
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const inputElement = createElement(component, {
    className:
      "w-full rounded-md shadow p-2 text-sm text-gray-900 placeholder-gray-400 ring-1 ring-gray-400 border-0 focus:ring-2 focus:ring-primary focus:outline-none",
    ...props,
    ...field,
  });

  return (
    <label className={`block py-1 space-y-1 ${className}`}>
      <span className="text-sm text-gray-600 font-semibold">{label}</span>
      {inputElement}
      {!!error && <div className="text-red-600 text-sm">{error.message}</div>}
    </label>
  );
};

export default Input;
