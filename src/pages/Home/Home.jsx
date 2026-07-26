import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LogoQrCode from '../../components/LogoQrCode/LogoQrCode'
import { LuScanText } from "react-icons/lu";
import './Home.css'

const Home = () => {
  return (
    <>
      <div className='home'>
        <Navbar />
        <LogoQrCode />
       <LuScanText className='icon-qrcode' />
      </div>

    </>
  )
}

export default Home