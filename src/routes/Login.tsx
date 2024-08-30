import React, { useState } from "react";
import logo from "../assets/LogoWithText.png";
import "../styles/components/Login.css";
import { useNavigate } from "react-router-dom";

export interface ILoginProps {
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<ILoginProps> = ({ authenticated, setAuthenticated }) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      if (response.ok) {
        setAuthenticated(true);
        navigate("/identifying");
      } else {
        const data = await response.json();
        setErrorMessage(
          data.detail ? "Invalid username or password" : "Login failed"
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
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

  const navToRegistration = () => {
    navigate("/registration");
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
          Log in
        </button>
        <button className="generalButton__primary" onClick={navToRegistration}>
          I'm new here
        </button>
        {errorMessage && <p className="login__errorMessage">{errorMessage}</p>}
      </form>
    </div>
  );
};

export { Login };
