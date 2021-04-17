import React from "react";
import { CodeIcon, MailIcon } from "@heroicons/react/outline";

function Contact(): JSX.Element {
  return (
    <div id="contact" className="w-full h-full py-12 grid grid-cols-5">
      <div className="h-full p-8 col-span-5 md:col-span-3 flex flex-col space-y-8 justify-center">
        <p className="text-xl text-center font-bold">Contact Me</p>
        <p className="text-center text-sm text-opacity-90">
          Reach me out by writing an email using the form or by any other method
          listed below.
        </p>
        <div className="flex flex-row space-x-7 justify-center">
          <a
            className="w-6 h-6 focus:outline-none"
            href="mailto:marcotomasrodriguez@gmail.com"
          >
            <MailIcon />
          </a>
          <a
            className="w-6 h-6 focus:outline-none"
            href="https://github.com/MarcoTomasRodriguez"
            target="_blank"
          >
            <CodeIcon />
          </a>
        </div>
      </div>
      <div className="p-4 col-span-5 md:col-span-2 flex flex-col space-y-6">
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Your message" rows={9} />
        <button
          type="submit"
          className="flex items-center justify-center w-full p-2 text-sm font-bold rounded-md bg-blue-700 hover:bg-blue-800 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Contact;
