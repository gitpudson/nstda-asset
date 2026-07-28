import React from 'react'
import { assets } from '../../assets/assets'
import './LogoQrCode.css'

const LogoQrCode = () => {
    return (
        <div className='logo-qrcode'>
            <img className='qrcode' src={assets.qrcode2} alt="" />            
            {/* <img className='logo' src="https://i.nstda.or.th/lib/search/cache/large/000100.jpg" alt="" />             */}
        </div>
    )
}

export default LogoQrCode
