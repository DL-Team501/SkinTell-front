import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  CheckProduct,
  Identifying,
  Login,
  Recommendation,
  Registration,
} from './routes';
import './App.css';
import './variables.css';
import './styles/general.css';
import { authenticatedState } from './atoms/username.atom';
import { Tabs } from './components/shared/Tabs';

const App: React.FC = () => {
  const authenticated = useRecoilValue(authenticatedState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/identifying"
          element={authenticated ? <Identifying /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendation"
          element={
            authenticated ? <Recommendation /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/checkProduct"
          element={authenticated ? <CheckProduct /> : <Navigate to="/login" />}
        />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      <Tabs />
    </BrowserRouter>
  );
};

export default App;
