import React, { useState } from 'react';
import logo from '../assets/LogoWithText.png';
import '../styles/components/Login.css';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { usernameState } from '../atoms/username.atom';
import { classificationState } from '../atoms/classification.atom';

export interface ILoginProps {
  authenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<ILoginProps> = ({ authenticated, setAuthenticated }) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setUsernameAtom = useSetRecoilState(usernameState);
  const setClassification = useSetRecoilState(classificationState);
  const resetClassification = useResetRecoilState(classificationState);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUsernameAtom(userName);
        data.classification
          ? setClassification([data.classification])
          : resetClassification();
        setAuthenticated(true);
        navigate('/identifying');
      } else {
        setErrorMessage(
          data.detail ? 'Invalid username or password' : 'Login failed'
        );
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
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
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const navToRegistration = () => {
    navigate('/registration');
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
        />
        <input
          type="password"
          className="login__input"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
        <span className="login__errorMessage">{errorMessage ?? ' '}</span>
        <button type="submit" className="login__button generalButton__primary">
          Log In
        </button>
        <span className="generalText">or</span>
        <button
          className="generalButton__secondary"
          onClick={navToRegistration}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export { Login };
