import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 mt-[1rem] bg-gray-100">
      <p className="text-sm text-gray-600 flex justify-center items-center space-x-2">
        <span>©3PTeam {new Date().getFullYear()}</span>
        <span>||</span>
        <span>RUPP ITE</span>
      </p>
    </footer>
  );
};

export default Footer;
