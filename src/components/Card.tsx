import { ComponentProps } from "react";

type CardProps = ComponentProps<"div">;

const Card = ({ className, ...props }: CardProps) => {
  return <div className={`p-5 shadow rounded ${className}`} {...props} />;
};

Card.Title = ({ className, ...props }: ComponentProps<"h1">) => (
  <h1 className={`text-black font-bold ${className}`} {...props} />
);

Card.Content = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={`mt-2 text-black text-sm ${className}`} {...props} />
);

Card.Actions = ({ className, ...props }: ComponentProps<"div">) => (
  <>
    <hr className="mt-3 border-t-2 w-full" />
    <div
      className={`pt-3 flex flex-row text-sm space-x-4 ${className}`}
      {...props}
    />
  </>
);

export default Card;
