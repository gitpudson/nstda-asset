import React, { useRef, useState } from "react";
import Navbar from '../../components/Navbar/Navbar'
import LogoQrCode from '../../components/LogoQrCode/LogoQrCode'
import { LuScanText } from "react-icons/lu";
import './Home.css'
import { Html5QrcodeScanner,Html5QrcodeSupportedFormats } from "html5-qrcode";
import ShowForm from "../../components/ShowForm/ShowForm";
import AssetRequestMobile from "../../components/AssetRequestMobile/AssetRequestMobile";
import AssetRequestMobile2 from "../../components/AssetRequestMobile2/AssetRequestMobile2";

const Home = () => {
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const openScanner = () => {
    setShowScanner(true);
    setShowForm(false);

    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
          formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8
          ]
        },
        false
      );

      scanner.render(
        (decodedText) => {
          setBarcode(decodedText);
          scanner.clear();
          setShowScanner(false);
          setShowForm(true);
        },
        () => { }
      );
    }, 100);
  };

  return (
    <>
      <div className='home'>
        {/* <Navbar /> */}

        {(!showScanner && !showForm) && (
                <>
                <Navbar />
                <LogoQrCode />
                <div className='btn-scan' onClick={openScanner}>
                  <LuScanText className='icon-qrcode' />
                  <div className='text-scan'>SCAN</div>
                </div>
                {/* <div className="input-box">
                  <input
                    className="input"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                  />
                </div> */}
                </>
        )}

        

        {showScanner && (
                <div className="scannerModal">
                    <div id="reader"></div>
                </div>
        )}

        {/* {showForm && ( <ShowForm  qrcode =  {barcode} />)} */}
        
       {/* <ShowForm  qrcode =  "1201-001-0001-0000011-000" /> */}
       {/* <AssetRequestMobile qrcode =  "1201-001-0001-000000156"/> */}

        {showForm && ( <AssetRequestMobile  qrcode =  {barcode} />)}

      </div>

    </>
  )
}

export default Home