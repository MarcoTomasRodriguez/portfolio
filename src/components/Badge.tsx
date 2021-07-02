import { ComponentProps } from "react";
import classNames from "classnames";

export type BadgeProps = ComponentProps<"div"> & {
  text: string;
  color: "red" | "green" | "blue" | "gray" | "yellow";
};

export function Badge({ text, color = "blue", ...props }: BadgeProps) {
  // Necessary for PurgeCSS.
  const badgeClass = classNames(
    "py-px px-2 mx-0.5 my-1 text-sm bg-opacity-20 rounded-xl whitespace-nowrap",
    {
      "bg-red-500 text-red-900": color === "red",
      "bg-green-500 text-green-900": color === "green",
      "bg-blue-500 text-blue-900": color === "blue",
      "bg-gray-500 text-gray-900": color === "gray",
      "bg-yellow-500 text-yellow-900": color === "yellow",
    }
  );

  return (
    <div className={badgeClass} {...props}>{text}</div>
  );
}
