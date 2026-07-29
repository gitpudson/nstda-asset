import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./AssetScanner.css";
import { assets } from "../../assets/assets";

// import logo from "../assets/logo.png";
// import qrImage from "../assets/sample-qr.png";

import {
    Card,
    Chip,
    Fab,
    Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function AssetScanner() {
  const scannerRef = useRef(null);

  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendToApi = async (qrValue) => {
    try {
      setLoading(true);

      const response = await fetch(
        "YOUR_API_ENDPOINT",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            qrCode: qrValue,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      // ตัวอย่าง
      // navigate(`/asset/${data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    try {
      if (scannerRef.current) return;

      const scanner = new Html5Qrcode("reader");

      scannerRef.current = scanner;

      setIsScanning(true);

      await scanner.start(
        {
          facingMode: "environment",
        },
        {
          fps: 10,
          qrbox: 250,
        },
        async (decodedText) => {
          navigator.vibrate?.(200);

          await stopScanner();

          await sendToApi(decodedText);
        },
        () => {}
      );
    } catch (error) {
      console.error(error);
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
      <header className="header">
        <div className="circle left"></div>
        <div className="circle right"></div>
        
        {/* <img className="logo" src={assets.co} alt="" /> */}

        <h1>ระบบตรวจสอบครุภัณฑ์</h1>

        {/* <p className="subtitle">
          สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน
        </p> */}

        {/* <Chip
            className="budget-chip"
            icon={<CalendarMonthIcon />}
            label={`สวทช. ปีงบประมาณ ${new Date().getFullYear() + 543}`}
        /> */}

        <div className="budget-pill">
          📅 สวทช. ปีงบประมาณ 2569
        </div>

        <div className="header-wave">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <path
              fill="#EEF2F8"
              d="
              M0,96
              C240,20
              480,20
              720,70
              C960,115
              1200,115
              1440,70
              L1440,180
              L0,180
              Z
            "
            />
          </svg>
        </div>
      </header>

      <main className="content">
        <div className="qr-card">
          <h2>สแกนคิวอาร์โค้ด</h2>

          {/* <div className="title-line"></div> */}

          {!isScanning ? (
            <div className="scanner-frame">
              <div className="qr-box">
                <img className="qr-image" src={assets.qrcode6} alt="" />

                <div className="scan-line"></div>
              </div>
            </div>
          ) : (
            <div
              id="reader"
              className="camera-box"
            />
          )}

          <p className="description">
            เพื่อตรวจสอบข้อมูลครุภัณฑ์
          </p>

          <div className="badge">
            SMR@NECTEC
          </div>
        </div>

      </main>

      <div className="bottom-wave"></div>

      <div className="scan-button-wrapper">
        {loading ? (
          <button
            className="scan-button"
            disabled
          >
            ...
          </button>
        ) : (
          <button
            className="scan-button"
            onClick={
              isScanning
                ? stopScanner
                : startScanner
            }
          >
            {isScanning ? "✕" : "⌲"}
          </button>
        )}

        <span>
          {isScanning
            ? "ปิดกล้อง"
            : "สแกน"}
        </span>
      </div>
    </div>
  );
}