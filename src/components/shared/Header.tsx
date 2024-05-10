import React from "react";
import logo from "../../assets/Logo.png";
import "../../styles/components/Header.scss";

const Header: React.FC = () => (
  <div className="Header">
    <p className="Header__title">SkinTell</p>
    <img src={logo} alt="logo" className="Header__title"></img>
  </div>
);

export { Header };
