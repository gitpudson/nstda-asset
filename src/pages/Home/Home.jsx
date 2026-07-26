import React, { useRef, useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import LogoQrCode from '../../components/LogoQrCode/LogoQrCode'
import { LuScanText } from "react-icons/lu";
import './Home.css'
import { Html5QrcodeScanner } from "html5-qrcode";

const Home = () => {
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const openScanner = () => {
    setShowScanner(true);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setBarcode(decodedText);
          scanner.clear();
          setShowScanner(false);
        },
        () => { }
      );
    }, 100);
  };

  return (
    <>
      <div className='home'>
        <Navbar />
        <LogoQrCode />
        <div className='btn-scan' onClick={openScanner}>
          <LuScanText className='icon-qrcode' />
          <div className='text-scan'>SCAN</div>
        </div>
        <div className="input-box">
          <input
            className="input"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>

      </div>

    </>
  )
}

export default Home