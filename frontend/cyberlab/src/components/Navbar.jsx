import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white h-[4rem]">
      <div className="flex items-start">
      <h1 className="text-xl text-left p-2">Cybersecurity Learning Platform</h1>
        <ul>
          <li>
            <button>ELO</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
