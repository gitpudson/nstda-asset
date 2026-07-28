import { useState ,useContext,useEffect} from "react";
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

import "./AssetRequestMobile.css";
import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

export default function AssetRequestMobile({ qrcode }) {

  const { url_api_backend, fetAssetByAssetCode ,fetStatus,isLoading,SaveData,isSaving} = useContext(AppContext);

  const [images, setImages] = useState([]);
  const [imgPerson,setImgPerson] = useState();
  const [data,setData] = useState({});
  const [statusList,setStatusList] = useState([]);
//   const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    org_owner: "",
    asset_code: "",
    asset_name: "",
    build: "",
    floor: "",
    room: "",
    person_id: 0,
    person_name: "",
    asset_status: "",
    new_building: "",
    new_floor: "",
    new_room: "",
    asset_image: "",
    image_url: "",
    new_status: "",
    updated_at: "",
    person_key: "",
    row_number: 0
  });

//   const [formData, setFormData] = useState({});

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

  //แปลงรูปเป็น Base64 ก่อน
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
        const base64 = reader.result.split(",")[1];

        resolve(
            `${file.name}||${file.type}||${base64}`
        );
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

//   const handleSave = async () => {

//     const payload = new FormData();

//     payload.append("function", "updateAsset");
//     payload.append("function", "updateAsset");

//     // ข้อมูลทั่วไป
//     Object.keys(formData).forEach((key) => {
//         payload.append(key, formData[key]);
//     });

//     // รูปภาพ
//     images.forEach((img) => {
//         payload.append("images", img.file);
//     });

//     //   await axios.post("/api/assets", payload, {
//     //     headers: {
//     //       "Content-Type": "multipart/form-data",
//     //     },
//     //   });

//     console.log(payload);

//     for (let pair of payload.entries()) {
//     console.log(pair[0], pair[1]);
//     }

// };

const handleSave1 = async () => {
  const imageData = await Promise.all(
    images.map((img) => fileToBase64(img.file))
  );

  const data = {
    function: "updateAsset",
    payload: {
      ...formData,
      image: imageData,
    },
  };

        console.log(data);

        // await axios.post(API_URL, data);
        const response = await axios.post(`${url_api_backend}`, data,
            {
                headers: {
                    'Content-Type': 'text/plain',
                },
                mode: "no-cors"
            }
        )


        if (response) {
            console.log("Success");
        }
};

const handleSave = async () => {

    // ตรวจสอบว่ามีรูปหรือไม่
    if (images.length === 0) {
    // alert("กรุณาถ่ายรูปหรือแนบรูปภาพอย่างน้อย 1 รูป");
    alert("กรุณาถ่ายรูปหรือแนบรูปภาพก่อน");
    return;
    }

    try {
        // setSaving(true);

        const imageData = await Promise.all(
            images.map((img) => fileToBase64(img.file))
        );

        const data = {
            function: "updateAsset",
            payload: {
            ...formData,
            image: imageData,
            },
        };

        SaveData(data);
        // alert("บันทึกสำเร็จ");

    } catch (error) {
        console.error(error);
        alert("บันทึกไม่สำเร็จ");
    } finally {
        // setSaving(false);
    }
        
};

useEffect(() => {
      const loadData = async () => {         
  
          const asset = await fetAssetByAssetCode(qrcode);
  
          console.log(asset);
        //   setData(asset);
          setFormData(asset);
          setImgPerson(`https://i.nstda.or.th/lib/search/cache/large/${asset.person_key}.jpg`);

        //   console.log(imgPerson);
        //   console.log(asset.asset_status);
          
          
      };
  
      // setIsLoading(true);
      loadData();
      // setIsLoading(false);
  
  }, []);

  useEffect(() => {
      const loadData = async () => {         
  
          const status = await fetStatus();  
          setStatusList(status);
        //   console.log("statusList =", statusList);      
          
      };
  
      loadData();   
  
  }, [statusList]);


  return (    
    <>
    {(isLoading) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>}
    {/* {(isLoading  || isSaving) && <center> <div><img className='loading' src="./nstda-asset/spinner.svg" alt="" /></div> </center>} */}

    {(!isLoading) && (

    <Box className="page">

    {/* Header */}
    <Box className="header">
    <IconButton>
        {/* <ArrowBackIcon /> */}
    </IconButton>

    <Typography variant="h6" fontWeight={300}>
        รายการผู้ถือครองครุภัณฑ์
    </Typography>
    
 
    <img className="logo-org" src={formData.org_owner === "สก." ? assets.co :
                               formData.org_owner === "ศอ." ? assets.nectec :
                               formData.org_owner === "ศช." ? assets.biotec :
                               formData.org_owner === "ศว." ? assets.mtec :
                               formData.org_owner === "ศล." ? assets.entec :
                               formData.org_owner === "ศน." ? assets.nanotec : ""

    } />    

      </Box>
          
      {/* Employee */}
      <Card className="employee-card">
        <Avatar
          src={imgPerson}
          sx={{
            width: 75,
            height: 75,
            bgcolor: "#ff6b00",
          }}
        />

        <Box>
          <Typography fontWeight={700}>
            {formData.person_name}
          </Typography>

          <Typography color="text.secondary">
            รหัสพนักงาน {formData.person_key}
          </Typography>

          <Typography color="text.secondary">
            หน่วยงาน {formData.org_owner}
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
          value={formData.asset_code}
        />

        {/* <Typography className="label">
          สถานะ
        </Typography> */}

        {/* <TextField
          select
          fullWidth
          size="small"
          name="asset_status"
          value={formData.asset_status}
          onChange={handleChange}
        >
          <MenuItem value="ใช้งานปกติ">
            ใช้งานปกติ
          </MenuItem>

          <MenuItem value="ชำรุด">
            ชำรุด
          </MenuItem>
        </TextField> */}

        {/* <TextField
            select
            fullWidth
            size="small"
            name="asset_status"
            value={formData.asset_status || ""}
            onChange={handleChange}
            >
            {statusList.map((status) => (
                <MenuItem
                key={status}
                value={status}
                >
                {status}
                </MenuItem>
            ))}
        </TextField> */}

        <Typography className="label">
          รายการครุภัณฑ์
        </Typography>

        <Box className="asset-box">
          <Typography fontWeight={700}>
            {formData.asset_name}
          </Typography>

          {/* <Typography variant="body2">
            ของห้องปฏิบัติการใช้สัตว์เพื่องานทางวิทยาศาสตร์
          </Typography> */}
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
          สถานะ
        </Typography>

        <TextField
            select
            fullWidth
            size="small"
            name="new_status"
            value={formData.new_status || ""}
            onChange={handleChange}
            >
            {statusList.map((status) => (
                <MenuItem
                key={status}
                value={status}
                >
                {status}
                </MenuItem>
            ))}
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
            {/* หรือเลือกจากแกลเลอรี่ */}
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

      {(isSaving) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>}
    {/* {(isSaving) && <center> <div><img className='loading' src="./nstda-asset/spinner.svg" alt="" /></div> </center>} */}

       {/* Save */}
      <Box className="footer">
        <Button
          fullWidth
          startIcon={<SaveIcon />}
          variant="contained"
          onClick={handleSave}
          className="save-btn"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </Box>


    </Box>


    )

    }
    
    </>    

  );
}