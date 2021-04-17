import React from "react";
import { ArrowDownIcon } from "@heroicons/react/outline";

function About(): JSX.Element {
  return (
    <div
      id="about"
      className="relative grid place-content-center min-w-screen min-h-screen bg-gradient-to-br from-blue-700 to-indigo-700"
    >
      <p className="text-center text-white font-bold text-2xl py-4 font-sans">
        Hey! Welcome, I'm Marco Tomás Rodríguez
      </p>
      <p className="text-center text-white text-xl py-4">Software Engineer</p>
      <button
        className="absolute text-white w-6 h-6 animate-bounce left-1/2 right-1/2 bottom-10 focus:outline-none"
        onClick={() => {
          const element = document.getElementById("experience");
          if (element) {
            element.scrollIntoView();
          }
        }}
      >
        <ArrowDownIcon />
      </button>
    </div>
  );
}

export default About;
