import React, { useState } from "react";
import logo from "../assets/cyber.png";
import PLDescription from "./Descriptions/PLDescription";
import LangButtons from "./Buttons/LangButtons";
import Navbar from "./Navbar";

const MainPage = () => {
  const [lang, setLang] = useState("PL");

  return (
    <>
      <Navbar />
      <div className="flex justify-between p-5 bg-gray-800 max-h-screen pt-20">
        <div className="w-1/2 p-5">
          <div className="flex justify-content-center space-x-5">
            <LangButtons lang={lang} setLang={setLang} />
          </div>
          <PLDescription lang={lang} />
        </div>
        <div className="px-8">
          <img
            src={logo}
            alt="Cybersecurity"
            className="w-full h-auto max-w-[500px]"
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
