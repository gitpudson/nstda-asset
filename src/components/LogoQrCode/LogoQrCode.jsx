import React from 'react'
import { assets } from '../../assets/assets'
import './LogoQrCode.css'

const LogoQrCode = () => {
    return (
        <div className='logo-qrcode'>
            <img className='logo' src={assets.qrcode2} alt="" />            
        </div>
    )
}

export default LogoQrCode
