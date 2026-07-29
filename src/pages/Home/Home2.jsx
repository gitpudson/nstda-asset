import React, { useRef, useState } from "react";
import "./Home2.css";
import { assets } from "../../assets/assets";
import { Html5QrcodeScanner,Html5QrcodeSupportedFormats } from "html5-qrcode";

import {
  Card,
  Chip,
  Fab,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AssetRequestMobile from "../../components/AssetRequestMobile/AssetRequestMobile";

// import logo from "../assets/obec-logo.png";
// import qrCode from "../assets/qr-code.png";

export default function Home2() {

    const [barcode, setBarcode] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const [showForm, setShowForm] = useState(false);

  const handleScan = () => {
    console.log("Scan Click");
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
    
    <div className="home-page">

        {(!showScanner && !showForm) && (
            <>
                    {/* Header */}
      <div className="hero-section">
        {/* <img
          src={assets.co}
          alt="OBEC"
          className="hero-logo" /> */}
 
      <Typography className="hero-title">
        ระบบตรวจสอบครุภัณฑ์
        </Typography>

        {/* <Typography className="hero-subtitle">
        สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
        </Typography> */}

        {/* <Typography className="hero-subtitle">
        สวทช.
        </Typography> */}

        <Chip
          className="budget-chip"
          icon={<CalendarMonthIcon />}
          label={`สวทช. ปีงบประมาณ ${new Date().getFullYear() + 543}`}
        />
      </div>

      {/* QR Card */}
      <Card className="qr-card">
        <Typography className="qr-title">
          สแกนคิวอาร์โค้ด
        </Typography>

        <div className="qr-frame">
          <img
          src={assets.qrcode2}
          alt="OBEC"
          className="hero-logo" />
        </div>

        <Typography className="qr-text">
          เพื่อตรวจสอบข้อมูลครุภัณฑ์
        </Typography>

        {/* <Chip
          label="SMR@NECTEC"
          className="system-chip"
        /> */}
      </Card>

      {/* Status */}
      {/* <Card className="status-card">
        <div className="status-icon">
          <VerifiedUserIcon />
        </div>

        <div>
          <Typography className="status-title">
            พร้อมใช้งาน
          </Typography>

          <Typography className="status-desc">
            สแกน QR Code เพื่อเริ่มใช้งานระบบ
          </Typography>
        </div>
      </Card> */}

      {/* Scan Button */}
      <div className="scan-section">
        <Fab
          className="scan-btn"
          onClick={handleScan}
        >
          <QrCodeScannerIcon sx={{ fontSize: 42 }} />
        </Fab>

        {/* <Typography className="scan-label">
          สแกน
        </Typography> */}
      </div>
            </>
        )}

        {showScanner && (
        <div className="scannerModal">
            <div id="reader"></div>
        </div>
         )}

    {showForm && ( <AssetRequestMobile  qrcode =  {barcode} />)}


    </div>
    
  

    </>
  );
}