import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*_+";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, length]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyClipboardPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0, 8);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Password Generator
            </h5>
          </div>
          <div className="flex items-center gap-5">
            <input
              type="text"
              value={password}
              className="p-2 text-lg outline-none rounded bg-slate-600"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyClipboardPassword}
              className="p-2 text-lg border-none rounded bg-blue-800"
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-1 mt-3 items-center">
            <input
              type="range"
              name=""
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLenght(e.target.value)}
            />
            <label htmlFor="length" className="text-white">
              Length:{length}
            </label>
          </div>
          <div className="flex text-sm gap-x-2 mt-3 items">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label className="text-white" htmlFor="number">
              Number
            </label>
          </div>
          <div className="flex text-sm gap-x-2 mt-3 items">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              name=""
              id=""
            />
            <label className="text-white" htmlFor="charInput">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
