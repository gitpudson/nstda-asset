import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LayersIcon from "@mui/icons-material/Layers";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SaveIcon from "@mui/icons-material/Save";

import "./AssetRequestMobile2.css";

export default function AssetRequestMobile() {
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    assetNo: "8900-001-0001-0002441-000",
    status: "REPAIR",
    building: "NECTEC",
    floor: "4",
    room: "PHT และ OEC",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    const previewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...previewImages]);
  };

  const handleSave = async () => {
    console.log(formData);

    // await axios.post(...)
  };

  return (
    <Box className="page">

      {/* Header */}
      <Box className="header">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={700}>
          แจ้งครุภัณฑ์
        </Typography>

        /logo-nectec.png
      </Box>

      {/* Employee */}
      <Card className="employee-card">
        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#ff6b00",
          }}
        />

        <Box>
          <Typography fontWeight={700}>
            Mr. Pichet Pudson
          </Typography>

          <Typography color="text.secondary">
            รหัสพนักงาน 003309
          </Typography>

          <Typography color="text.secondary">
            หน่วยงาน NECTEC
          </Typography>
        </Box>
      </Card>

      {/* Form */}
      <Card className="form-card">

        <Typography className="label">
          รหัสครุภัณฑ์
        </Typography>

        <TextField
          fullWidth
          size="small"
          value={formData.assetNo}
        />

        <Typography className="label">
          สถานะ
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="NORMAL">
            ใช้งานปกติ
          </MenuItem>

          <MenuItem value="REPAIR">
            ส่งซ่อม
          </MenuItem>
        </TextField>

        <Typography className="label">
          รายการครุภัณฑ์
        </Typography>

        <Box className="asset-box">
          <Typography fontWeight={700}>
            งานปรับปรุงห้อง Changing Room และ Ante Room
          </Typography>

          <Typography variant="body2">
            ของห้องปฏิบัติการใช้สัตว์เพื่องานทางวิทยาศาสตร์
          </Typography>
        </Box>

        <Typography className="label">
          อาคาร
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          name="building"
          value={formData.building}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <ApartmentIcon
                sx={{
                  mr: 1,
                  color: "#ff6b00",
                }}
              />
            ),
          }}
        >
          <MenuItem value="NECTEC">
            NECTEC
          </MenuItem>
        </TextField>

        <Typography className="label">
          ชั้น
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <LayersIcon
                sx={{
                  mr: 1,
                  color: "#ff6b00",
                }}
              />
            ),
          }}
        >
          <MenuItem value={formData.floor}>
            ชั้น 4
          </MenuItem>
        </TextField>

        <Typography className="label">
          ห้อง
        </Typography>

        <TextField
          select
          fullWidth
          size="small"
          name="room"
          value={formData.room}
          onChange={handleChange}
        >
          <MenuItem value="PHT และ OEC">
            PHT และ OEC
          </MenuItem>
        </TextField>

        <Typography className="label">
          รูปภาพ
        </Typography>

        <label className="upload-box">
          <CameraAltIcon
            sx={{
              fontSize: 40,
              color: "#ff6b00",
            }}
          />

          <Typography>
            แตะเพื่อถ่ายรูป
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            หรือเลือกจากแกลเลอรี่
          </Typography>

          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            capture="environment"
            onChange={handleImage}
          />
        </label>

        <Box className="gallery">
            {images.map((item, index) => (
                <img
                key={index}
                src={item.preview}
                alt={`preview-${index}`}
                className="preview"
                />
            ))}
        </Box>

      </Card>

      {/* Save */}
      <Box className="footer">
        <Button
          fullWidth
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSave}
          className="save-btn"
        >
          Save
        </Button>
      </Box>

    </Box>
  );
}