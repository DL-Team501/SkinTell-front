import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, About } from "./routes";
import "./App.css";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/about" Component={About} />
    </Routes>
  </BrowserRouter>
);

export default App;
