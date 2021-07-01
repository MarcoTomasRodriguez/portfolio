import { useEffect, useState } from "react";
import { interval } from "rxjs";
import { map, take } from "rxjs/operators";

type TypewriterProps = React.ComponentProps<"p"> & {
  text: string;
};

export default function Typewriter({ text, ...props }: TypewriterProps) {
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
    <p {...props}>
      {currentText}
      {running && <span className="animate-blink">|</span>}
    </p>
  );
}
