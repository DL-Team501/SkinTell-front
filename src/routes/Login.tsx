import React, { useState } from "react";
import logo from "../assets/LogoWithText.png";
import "../styles/components/Login.css";
import { useNavigate } from "react-router-dom";
import users from "../assets/users.json";

export interface ILoginProps {
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<ILoginProps> = ({ authenticated, setAuthenticated }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (users.find((u) => u.userName === userName && u.password === password)) {
      setAuthenticated(true);
      navigate("/identifying");
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setUserName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setPassword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="login">
      <img src={logo} alt="logo" className="login__image"></img>
      <form
        className="login__form"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <input
          className="login__input"
          value={userName}
          onChange={onChangeUserName}
          placeholder="Username"
        ></input>
        <input
          type="password"
          className="login__input"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        ></input>
        <button type="submit" className="login__button generalButton__primary">
          Sign in
        </button>
        {errorMessage && <p className="login__errorMessage">{errorMessage}</p>}
      </form>
    </div>
  );
};

export { Login };
