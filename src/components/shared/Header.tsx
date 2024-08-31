import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../../assets/LogoWithText.png';
import '../../styles/components/Header.css';
import { useRecoilValue } from 'recoil';
import { usernameState } from '../../atoms/username.atom';

const Header: React.FC = () => {
  const username = useRecoilValue(usernameState);
  return (
    <div className="header">
      <div className="profileContainer">
        {!!username.length && (
          <div className="profile">
            <AiOutlineUser color="#93693f" size={'medium'} />
          </div>
        )}
        <span className="generalText username">
          <b>{username}</b>
        </span>
      </div>
      <img src={logo} alt="logo" className="header__image" />
    </div>
  );
};

export { Header };
