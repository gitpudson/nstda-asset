import React, { useRef, useState, useContext,useEffect } from "react";
import './ShowForm.css';
import { AppContext } from '../../context/AppContext';

const ShowForm = ({ qrcode }) => {
  const { url_api_backend, fetAssetByAssetCode } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data,setData] = useState({});


  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);

        const asset = await fetAssetByAssetCode(qrcode);

        console.log(asset);
        setData(asset);

        setIsLoading(false);
    };

    loadData();
}, []);

  return (
    <>
      <div className="form-show">
       {/* {(isLoading) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>} */}
       {(isLoading) && <center> <div><img className='loading' src="./nstda-asset/spinner.svg" alt="" /></div> </center>}

       {data && (
        <>
          <div><img className='img-profile' src="https://i.nstda.or.th/lib/search/cache/large/+ {data.person_key} + .jpg" alt="image" width="100" height="100" /></div>
          <div>{data.person_name}</div>        
        </>
        

       )

       }
      
      </div>
    </>
    
  )
}

export default ShowForm
