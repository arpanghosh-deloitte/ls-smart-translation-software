import React from "react";

const Header: React.FC = () => (
  <header className="flex items-center px-6 py-3 bg-[#343741] shadow-sm">
    {/* Deloitte dot uses their green */}
    <span className="font-bold text-white text-2xl">
      Deloitte
      <span
        className="inline-block w-3 h-3 rounded-full ml-2 align-middle"
        style={{ backgroundColor: "#86BC25" }}
      ></span>
    </span>
  </header>
);

export default Header;
