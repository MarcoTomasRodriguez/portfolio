import { ComponentProps, useEffect, useState } from "react";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

type TypewriterProps = Omit<ComponentProps<"span">, "children"> & {
  text: string;
};

const Typewriter = ({ text, ...props }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState("");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    interval(60)
      .pipe(
        map((index) => text.substr(0, index + 1)),
        take(text.length)
      )
      .subscribe({
        next: (text) => setCurrentText(() => text),
        error: () => {},
        complete: () => setRunning(() => false),
      });
  }, [text]);

  return (
    <span {...props}>
      {currentText}
      {running && <span className="animate-blink">|</span>}
    </span>
  );
};

export default Typewriter;
