import { useEffect, useState } from "react";
import { interval, Observable } from "rxjs";
import { map, take } from "rxjs/operators";

type TypewriterAnimationProps = React.ComponentProps<"p"> & {
  text: string;
};

export default function TypewriterAnimation({
  text,
  ...props
}: TypewriterAnimationProps) {
  const [currentText, setCurrentText] = useState("");
  const [running, setRunning] = useState(true);

  useEffect(() => {
    interval(75)
      .pipe(
        map((index) => text.substr(0, index + 1)),
        take(text.length)
      )
      .subscribe(
        (text) => setCurrentText(() => text),
        () => {},
        () => setRunning(() => false)
      );
  }, []);

  return (
    <p {...props}>
      {currentText}
      {running && <span className="animate-blink">|</span>}
    </p>
  );
}
