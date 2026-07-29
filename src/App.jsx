import React, { useEffect, useContext,seMemo, useState,useMemo } from 'react';
import { AppContext } from "./context/AppContext";
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Home2 from './pages/Home/Home2';

import axios from 'axios';
import AssetForm from './components/AssetForm/AssetForm';

import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import AssetScanner from './pages/AssetScanner/AssetScanner';

function App() {

  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  const { menu_building } = useContext(AppContext);


  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
        <div className="app">
          {/* <Home mode={mode} setMode={setMode}/> */}
          {/* <Home2 /> */}
          {/* <div className="mobile-container">
            <AssetScanner />
          </div> */}
          <AssetScanner />
         
          
        </div>
      {/* </ThemeProvider> */}
    </>
  )
}

export default App
