import React, { useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import './AssetForm.css'

export default function AssetForm() {
  const [barcode, setBarcode] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const fileInputRef = useRef(null);

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
        () => {}
      );
    }, 100);
  };

  const captureImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleSave = () => {
    const data = {
      barcode,
      status,
      image,
    };

    console.log(data);
    alert("Save Success");
  };

  return (
    <div className="container">
      {/* Barcode */}
      <div className="card">
        <label className="label">🔳 BARCODE</label>

        <div className="row">
          <input
            className="input"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />

          <button className="iconBtn" onClick={openScanner}>
            📷
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="card">
        <label className="label">☰ STATUS</label>

        <div className="row">
          <select
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Please select</option>
            <option value="normal">ใช้งานปกติ</option>
            <option value="broken">ชำรุด</option>
          </select>

          <button className="iconBtn">
            ⚙️
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="card">
        <label className="label">📸 IMAGE</label>

        <div className="imageBox">
          {image ? (
            {image}
          ) : (
            <div className="placeholder">
              No image captured
            </div>
          )}

          <button
            className="cameraBtn"
            onClick={captureImage}
          >
            📷
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
      </div>

      <button className="saveBtn" onClick={handleSave}>
        Save
      </button>

      {showScanner && (
        <div className="scannerModal">
          <div id="reader"></div>
        </div>
      )}
    </div>
  );
}