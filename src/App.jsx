import React, { useEffect, useContext } from 'react';
import { AppContext } from "./context/AppContext";
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';

import axios from 'axios';


function App() {

  const { menu_building } = useContext(AppContext);


  return (
    <>

      <div className="app">
        <Navbar />

      </div>

    </>
  )
}

export default App
