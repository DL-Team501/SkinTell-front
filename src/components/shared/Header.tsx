import React from "react";
import logo from "../../assets/LogoWithText.png";
import "../../styles/components/Header.css";

const Header: React.FC = () => (
  <div className="header">
    <p className="header__title generalText"></p>
    <img src={logo} alt="logo" className="header__image"></img>
  </div>
);

export { Header };
