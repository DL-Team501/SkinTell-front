import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/shared";
import "../styles/components/Registration.css";

const Registration: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    // todo: write to file
  };

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="registration">
      <Header></Header>
      <form className="registration__form" onSubmit={handleSubmit}>
        <input
          className="registration__input"
          value={userName}
          onChange={onChangeUserName}
          placeholder="Username"
        ></input>
        <input
          type="password"
          className="registration__input"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        ></input>
        <button
          type="submit"
          className="registration__button generalButton__primary"
        >
          Sign in
        </button>
        {/* {errorMessage && <p className="registration__errorMessage">{errorMessage}</p>} */}
      </form>
    </div>
  );
};

export { Registration };
