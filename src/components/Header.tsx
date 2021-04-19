import React, { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
} from "@heroicons/react/solid";
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime,
} from "rxjs/operators";
import { fromEvent } from "rxjs";

enum Direction {
  Up = "Up",
  Down = "Down",
}
interface HeaderButton {
  title: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  onClick: () => void;
}

function navigateToElementById(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView();
  }
}

const BUTTONS = [
  {
    title: "About",
    icon: (props) => <UserIcon {...props} />,
    onClick: () => navigateToElementById("about"),
  },
  {
    title: "Experience",
    icon: (props) => <BriefcaseIcon {...props} />,
    onClick: () => navigateToElementById("experience"),
  },
  {
    title: "Projects",
    icon: (props) => <CodeIcon {...props} />,
    onClick: () => navigateToElementById("projects"),
  },
  {
    title: "Contact Me",
    icon: (props) => <MailIcon {...props} />,
    onClick: () => navigateToElementById("contact"),
  },
  {
    title: "Change Language",
    icon: (props) => <TranslateIcon {...props} />,
  },
] as HeaderButton[];

function Header(): JSX.Element {
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    // window.scroll observable.
    const scroll$ = fromEvent(window, "scroll").pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]) => (y2 < y1 ? Direction.Up : Direction.Down)),
      distinctUntilChanged(),
      share()
    );

    // On scroll up, set header visibility to true.
    scroll$
      .pipe(filter((direction) => direction === Direction.Up))
      .subscribe(() => setVisibility(() => true));

    // On scroll down, set header visibility to false.
    scroll$
      .pipe(filter((direction) => direction === Direction.Down))
      .subscribe(() => setVisibility(() => false));
  }, []);

  return (
    <header
      className={`fixed flex flex-row space-x-8 sm:space-x-6 md:space-x-14 justify-center w-full z-50 bg-primary p-2 transition transform duration-200 ease-in ${
        visibility ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {BUTTONS.map((button, index) => (
        <button
          key={index}
          className="flex flex-row text-sm text-white font-bold focus:outline-none p-3 rounded hover:bg-black hover:bg-opacity-10"
          onClick={button.onClick}
        >
          <button.icon
            className="visible sm:invisible h-5 w-5 sm:h-0 sm:w-0"
            viewBox="0 0 20 20"
          />
          <p className="invisible sm:visible h-0 w-0 sm:h-auto sm:w-auto">
            {button.title}
          </p>
        </button>
      ))}
    </header>
  );
}

export default Header;
