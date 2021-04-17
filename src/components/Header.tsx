import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
} from "@heroicons/react/solid";
import React from "react";

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
  return (
    <header
      className="fixed flex flex-row space-x-12 md:space-x-14 lg:space-x-16 justify-center w-full z-50 p-4"
      style={{ backgroundColor: "#2748d4" }}
    >
      {BUTTONS.map((button, index) => (
        <div>
          <button
            key={index}
            className="flex flex-row text-sm text-white font-bold focus:outline-none"
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
        </div>
      ))}
    </header>
  );
}

export default Header;
