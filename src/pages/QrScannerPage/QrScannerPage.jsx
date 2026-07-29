import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./QrScannerPage.css";

// import logo from "../assets/logo.png";
// import qrPlaceholder from "../assets/qr-placeholder.png";
import { assets } from "../../assets/assets";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import {
    Card,
    Chip,
    Fab,
    Typography,
} from "@mui/material";

export default function AssetScanner() {
  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");

  const startScanner = async () => {
    try {
      if (scannerRef.current) return;

      const html5QrCode = new Html5Qrcode("reader");

      scannerRef.current = html5QrCode;

      setIsScanning(true);

      await html5QrCode.start(
        {
          facingMode: "environment",
        },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1,
        },
        (decodedText) => {
          setScanResult(decodedText);

          navigator.vibrate?.(200);

          stopScanner();
        },
        () => {}
      );
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเปิดกล้องได้");
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();

        scannerRef.current = null;
      }

      setIsScanning(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="scanner-page">
      {/* Header */}

      <header className="header">
        <div className="circle left"></div>
        <div className="circle right"></div>
        <div className="header-content">
        {/* <img className="logo" src={assets.co}alt="" />  */}

        <Typography className="hero-title">
            ระบบตรวจสอบครุภัณฑ์
        </Typography>

        {/* <p className="subtitle">
          สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน
        </p> */}

        <div className="budget-pill">
          📅 {`สวทช. ปีงบประมาณ ${new Date().getFullYear() + 543}`}
        </div>

     
        </div>
      </header>

      <main className="content">
        <div className="qr-card">
          <h2>สแกนคิวอาร์โค้ด</h2>

          <div className="title-line"></div>

          {!isScanning ? (
            <div className="scanner-frame">
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>

              <div className="qr-box">
               <img className="qr-image" src={assets.qrcode6}alt="" /> 

                <div className="scan-line"></div>
              </div>
            </div>
          ) : (
            <div
              id="reader"
              className="camera-box"
            />
          )}

          {/* <p className="description">
            เพื่อตรวจสอบข้อมูลครุภัณฑ์
          </p> */}

          <div className="badge">
            SMR@NECTEC
          </div>

          {scanResult && (
            <div className="result-box">
              <div className="result-title">
                ผลการสแกน
              </div>

              <div className="result-value">
                {scanResult}
              </div>
            </div>
          )}
        </div>

        {/* <div className="status-section">
          <div className="status-icon">
            ✓
          </div>

          <div>
            <h3>พร้อมใช้งาน</h3>

            <p>
              กรุณาสแกน QR Code ด้านบน
              <br />
              หรือกดปุ่ม Scan ด้านล่าง
            </p>
          </div>
        </div> */}
      </main>

      <div className="bottom-wave"></div>

      <div className="scan-button-wrapper">
        {!isScanning ? (
          <>
            {/* <button
              className="scan-button"
              onClick={startScanner}
            >
              ⌲
            </button> */}

            <div className="scan-section">
                <Fab
                                className="scan-btn"
                                // onClick={handleScan}
                            >
                                <QrCodeScannerIcon sx={{ fontSize: 42 }} />
                            </Fab>
            </div>

            {/* <span>สแกน</span> */}
          </>
        ) : (
          <>
            <button
              className="scan-button stop"
              onClick={stopScanner}
            >
              ✕
            </button>

            <span>ปิดกล้อง</span>
          </>
        )}
      </div>
    </div>
  );
}