import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, Identifying, Login } from "./routes";
import "./App.css";
import "./variables.css";
import "./styles/general.css";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/identifying"
          element={authenticated ? <Identifying /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            <Login
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
