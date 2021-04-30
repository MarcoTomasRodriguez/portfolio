import { ComponentProps } from "react";

export type BadgeProps = ComponentProps<"div"> & {
  text: string;
  color: "red" | "orange" | "amber" | "green" | "blue" | "gray";
};

export function Badge({ text, color = "blue", ...props }: BadgeProps) {
  return (
    <div
      className={`py-px px-2 text-sm font-medium bg-opacity-20 rounded-xl bg-${color}-500 text-${color}-900`}
      {...props}
    >
      {text}
    </div>
  );
}
