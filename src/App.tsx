import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './routes/Home';
import {About} from './routes/About';


const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        {/* <Route path="/contact" component={Contact} /> */}
      </Routes>
    </BrowserRouter>

);

export default App;
