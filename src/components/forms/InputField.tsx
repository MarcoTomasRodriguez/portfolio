export type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  error: any;
};

export default function InputField({
  error,
  label,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={props.name}>{label}</label>
      <input className={error?.message ? "input--error" : ""} {...props} />
      {error && <span className="text-xs text-red-700">{error?.message}</span>}
    </div>
  );
}
