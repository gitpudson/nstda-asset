import React, { useRef, useState, useContext,useEffect } from "react";
import './ShowForm.css';
import { AppContext } from '../../context/AppContext';

const ShowForm = ({ qrcode }) => {
  const { url_api_backend, fetAssetByAssetCode ,isLoading} = useContext(AppContext);
  // const [isLoading, setIsLoading] = useState(true);
  const [data,setData] = useState({});
  const [imgurl,setImgUrl] = useState();
  // var img_url = "https://i.nstda.or.th/lib/search/cache/large/";


  useEffect(() => {
    const loadData = async () => {
        

        const asset = await fetAssetByAssetCode(qrcode);

        console.log(asset);
        setData(asset);
        setImgUrl(`https://i.nstda.or.th/lib/search/cache/large/${asset.person_key}.jpg`)
        // console.log(img_url);
        
    };

    // setIsLoading(true);
    loadData();
    // setIsLoading(false);

}, []);

  return (
    <>
      <div className="form-show">
       {(isLoading) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>}
       {/* {(isLoading) && <center> <div><img className='loading' src="./nstda-asset/spinner.svg" alt="" /></div> </center>} */}

       {(!isLoading) && (
        <>
          <div><img className='img-profile' src={imgurl} alt="" width="100" height="100" /></div>
          <div>ผู้ถือครอง : {data.person_name}</div>        
          <div>รหัสพนักงาน : {data.person_key}</div>        
          <div>หน่วยงาน : {data.org_owner}</div>        
          <div>รหัสครุภัณฑ์ : {data.asset_code}</div>        
          <div>รายการครุภัณฑ์ : {data.asset_name}</div>        
          <div>อาคาร : {data.new_building === "" ? data.build : data.new_building}</div>        
          <div>ชั้น : {data.new_floor === "" ? data.floor : data.new_floor}</div>        
          <div>ห้อง : {data.new_room === "" ? data.room : data.new_room}</div>        
          <div>สถานะ : {data.new_status === "" ? data.asset_status : data.new_status}</div>        
          <div>แก้ไขล่าสุด : {data.updated_at}</div>        
        </>
        

       )

       }
      
      </div>
    </>
    
  )
}

export default ShowForm
