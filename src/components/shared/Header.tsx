import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../../assets/LogoWithText.png';
import '../../styles/components/Header.css';
import { useRecoilValue } from 'recoil';
import { IoLogOutOutline } from 'react-icons/io5';
import { usernameState } from '../../atoms/username.atom';
import { useLogout } from '../../hooks/logout.hook';

const Header: React.FC = () => {
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const username = useRecoilValue(usernameState);
  const logout = useLogout();

  return (
    <div className="header">
      <div className="profileContainer">
        {!!username.length && (
          <div
            className="profile"
            onClick={() => setIsProfileClicked((prev) => !prev)}
          >
            <AiOutlineUser color="#93693f" size={'medium'} />
          </div>
        )}
        <span className="generalText username">
          <b>{username}</b>
        </span>
        {isProfileClicked && (
          <div className="profile logOut" onClick={logout}>
            <IoLogOutOutline size={'25'} color="#eadcce" />
          </div>
        )}
      </div>
      <img src={logo} alt="logo" className="header__image" />
    </div>
  );
};

export { Header };
