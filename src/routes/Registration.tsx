import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/shared';
import '../styles/components/Registration.css';
import { backendUrl } from '../api/config';

const Registration: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${backendUrl}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    });

    if (response.ok) {
      console.log('User registered successfully');
      navigate('/login');
    } else {
      setErrorMessage('This username already exists.');
      console.error('Failed to register user');
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
          Sign Me!
        </button>
        {errorMessage && (
          <p className="registration__errorMessage">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export { Registration };
