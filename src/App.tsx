import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
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

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <Login
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            }
          />
          <Route
            path='/identifying'
            element={authenticated ? <Identifying /> : <Navigate to='/login' />}
          />
          <Route
            path='/recommendation'
            element={
              authenticated ? <Recommendation /> : <Navigate to='/login' />
            }
          />
          <Route
            path='/checkProduct'
            element={
              authenticated ? <CheckProduct /> : <Navigate to='/login' />
            }
          />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
