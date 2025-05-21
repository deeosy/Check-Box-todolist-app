import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="absolute bottom-3  " >
      <p className="text-[14px] " >Copyright ⓒ {year}. By D33 </p>
    </footer>
  );
}

export default Footer;