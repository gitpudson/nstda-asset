import React, { useContext,useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

const Navbar = () => {

    const { isLoading,dataBuilding  } = useContext(AppContext);
    const [menu, setMenu] = useState("");

    const menuClick =  (item) => {
        setMenu(item.BuildingName)
        // console.log(item);

    }

    return (
        <>
            <div className='navbar-title'>
                <div>ระบบตรวจสอบครุภัณฑ์ สวทช.</div>
                <div>ประจำปี {new Date().getFullYear()+543}</div>
            </div>

        </>
    )
}

export default Navbar