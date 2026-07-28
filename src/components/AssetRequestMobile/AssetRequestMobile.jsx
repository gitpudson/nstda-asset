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

export default function AssetRequestMobile({ qrcode }) {

  const { url_api_backend, fetAssetByAssetCode ,fetStatus,isLoading} = useContext(AppContext);

  const [images, setImages] = useState([]);
  const [imgPerson,setImgPerson] = useState();
  const [data,setData] = useState({});
  const [statusList,setStatusList] = useState([]);

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

  const handleSave = async () => {
    console.log(formData);

    // await axios.post(...)
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
          console.log("statusList =", statusList);      
          
      };
  
      loadData();   
  
  }, [statusList]);


  return (    
    <>
    {(isLoading) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>}
    {/* {(isLoading) && <center> <div><img className='loading' src="./nstda-asset/spinner.svg" alt="" /></div> </center>} */}

    {(!isLoading) && (

    <Box className="page">

    {/* Header */}
    <Box className="header">
    <IconButton>
        {/* <ArrowBackIcon /> */}
    </IconButton>

    <Typography variant="h6" fontWeight={700}>
        รายการครุภัณฑ์ผู้ถือครอง
    </Typography>
    
 
    <img className="logo" src={formData.org_owner === "สก." ? assets.co :
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

        <Typography className="label">
          สถานะ
        </Typography>

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

        <TextField
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
        </TextField>

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


    )

    }
    
    </>    

  );
}