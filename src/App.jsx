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
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} /> */}
        </Routes>

      </div>

    </>
  )
}

export default App
