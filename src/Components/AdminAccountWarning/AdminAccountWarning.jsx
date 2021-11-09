import React from 'react'
import {AiFillWarning} from 'react-icons/all'
function AdminAccountWarning({role}) {
    return (
        role === 'admin' ? <span className="warning-text" style={{ width: "100%", height: "35px", display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:'#FF5C58',color:'white',borderBottomLeftRadius:'6px',borderBottomRightRadius:'6px'}}>
        <AiFillWarning color = "white" size = "18px" />&nbsp;&nbsp;&nbsp;<p className = "openSansText" style = {{fontSize:'14px'}}>Şuan yönetici hesap ile oturum açtınız.Hesap sahibi siz değilseniz oturumu kapatmanız gerekir.</p>
    </span> : null
    )
}

export default AdminAccountWarning
