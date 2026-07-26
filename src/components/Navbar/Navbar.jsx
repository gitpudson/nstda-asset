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
             <div className='title'>
                <Link to='/' onClick={()=>setMenu("")} className='logo'>ระบบตรวจสอบครุภัณฑ์ สวทช. ประจำปี {new Date().getFullYear()+543}</Link>
            </div>
        
            <div className='navbar'>
                {/* <Link to='/'><img src={logo} alt="" className="logo" /></Link> */}
            
                {(isLoading) && <center> <div><img className='loading' src="./spinner.svg" alt="" /></div> </center>}
                {(dataBuilding.length !== 0) &&
                    <div className="navbar-menu">
                        {
                            dataBuilding.filter(d=>d.IsHide !== true).map((item,index) =>{
                                var param = "/"+ item.BuildingName.toLowerCase().replace(" ","");
                                var img = item.BuildingName === "CO" ? assets.co :
                                            item.BuildingName === "NECTEC" ? assets.nectec :
                                            item.BuildingName === "BIOTEC" ? assets.biotec :
                                            item.BuildingName === "MTEC" ? assets.mtec :
                                            item.BuildingName === "NANOTEC" ? assets.nanotec :
                                            item.BuildingName === "ENTEC" ? assets.entec : assets.co
                                return(
                                    <div  key={index} onClick={()=>menuClick(item)}>
                                    <Link to={param} className={menu===item.BuildingName?"active":""}>
                                            <img src={img} alt="" className="logo" />
                                    </Link> 
                                    </div>
                                )
                            })
                        }
                    </div>

                }

                <div className="navbar-right">
                        
                        
                </div>

            </div>

        </>
    )
}

export default Navbar