import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const btnRef = useRef(null);
  const [number, setNumber] = useState(false);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "012345678";
    const characters = "@#$%^&*()[]{}";
    if (character) str += characters;
    if (number) str += numbers;
    if (character && number) {
      str += numbers;
      str += character;
    }
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
      setPassword(pass);
    }
  }, [length, character, number,setPassword]);

  const lengthHandler = (e) => {
    setLength(e.target.value);
  };
  const charHandler = () => {
    setCharacter((prev) => !prev);
  };
  const numHandler = () => {
    setNumber((prev) => !prev);
  };
  const copyHandler = () => {
    window.navigator.clipboard.writeText(password).then(() => alert(`${password} copied`));
  };
  useEffect(()=>{
    generatePassword()
  },[number,character,length])
  return (
    <>
      <div className="bg-violet-900 h-screen w-full flex justify-center items-center">
        <div className="w-[400px] p-5 flex flex-col box shadow-2xl rounded-sm">
          <h1 className="text-white mb-4 text-center text-xl font-bold">
            Password Generator
          </h1>
          <div>
            <input
              type="text"
              className="outline-none border-none p-2 w-[80%] rounded-tl-md rounded-bl-md"
              readOnly
              value={password}
            />
            <button
              className="w-[20%] bg-blue-600 p-2 text-[17px] font-medium rounded-tr-md rounded-br-md text-white"
              onClick={() => copyHandler()}
              ref={btnRef}
            >
              Copy
            </button>
          </div>
          <div className="text-white flex items-center h-[50px] w-full">
            <label className="w-[20%] text-[18px]">Length </label>
            <input
              type="range"
              min={1}
              max={50}
              defaultValue={length}
              className="w-[65%] align-middle h-8"
              onChange={(e) => lengthHandler(e)}
            />
            <span className="text-[20px] w-[15%] text-right">{length}</span>
          </div>
          <div className="w-[80%] flex flex-row  h-[50px] mx-auto">
            <div className="w-[50%]">
              <input
                type="checkbox"
                className=""
                onClick={() => numHandler()}
              />
              <label className="ml-3 text-[20px] text-white">numbers</label>
            </div>
            <div className="w-[50%]">
              <input
                type="checkbox"
                className=""
                onChange={() => charHandler()}
              />
              <label className="ml-3 text-[20px] text-white">speChars</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
