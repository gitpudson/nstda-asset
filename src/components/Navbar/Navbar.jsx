import React, { useContext,useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

const Navbar = () => {

    const { isLoading,dataBuilding  } = useContext(AppContext);
    const [menu, setMenu] = useState("");
    // const [logo, setLogo] = useState(assets.Co);

    const menuClick =  (item) => {
        setMenu(item.BuildingName)
        // console.log(item);

    }

    return (
        <>
            {/* <div className='title'>
                <Link to='/' onClick={()=>setMenu("")} className='logo'>ระบบตรวจสอบครุภัณฑ์ สวทช. ประจำปี {new Date().getFullYear()+543}</Link>
            </div> */}

            <div className='navbar-title'>
                <div>ระบบตรวจสอบครุภัณฑ์ สวทช.</div>
                <div>ประจำปี {new Date().getFullYear()+543}</div>
            </div>
        
            <div className='navbar'>
                <img className='logo' src={assets.qrcode} alt="" />

            </div>

        </>
    )
}

export default Navbar