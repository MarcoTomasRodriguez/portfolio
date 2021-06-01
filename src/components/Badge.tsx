import { ComponentProps } from "react";
import classNames from "classnames";

export type BadgeProps = ComponentProps<"div"> & {
  text: string;
  color: "red" | "green" | "blue" | "gray";
};

export function Badge({ text, color = "blue", ...props }: BadgeProps) {
  // Necessary for PurgeCSS.
  const badgeClass = classNames(
    "py-px px-2 text-sm font-medium bg-opacity-20 rounded-xl",
    {
      "bg-red-500 text-red-900": color === "red",
      "bg-green-500 text-green-900": color === "green",
      "bg-blue-500 text-blue-900": color === "blue",
      "bg-gray-500 text-gray-900": color === "gray",
    }
  );

  return (
    <div className={badgeClass} {...props}>
      {text}
    </div>
  );
}
