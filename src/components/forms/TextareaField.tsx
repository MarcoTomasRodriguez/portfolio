export type TextareaFieldProps = React.ComponentProps<"textarea"> & {
  label: string;
  error: any;
};

export default function TextareaField({
  label,
  error,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={props.name}>{label}</label>
      <textarea className={error?.message ? "input--error" : ""} {...props} />
      {error && <span className="text-xs text-red-700">{error?.message}</span>}
    </div>
  );
}
