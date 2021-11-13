import React from 'react'
import './InputWithIcon.css'
import { AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/all'

function InputWithIcon({ required=true,htmlFor,onChangeEvent ,icon, placeholder,passStatus,type,isPasswordInput, ...props }) {

    let changePasswordState = () => {
        props.changeShowPasswordState();
    }


    let changeEvent = (e) => {
        onChangeEvent(e.target.value)
    }

    return (
        <div className="special-input">
            <label className="input-label" htmlFor={htmlFor}>
                <span className="icon">{icon}</span>
                <input value = {props.value} autoComplete = "off" style = {props.style} onChange = {changeEvent} className="openSansText" required={required} id={htmlFor} type={type} placeholder={placeholder} />
                {
                    isPasswordInput === true ? <span onClick={changePasswordState} className="eye-icon">{passStatus === true ? <AiOutlineEyeInvisible title = "Şifre'yi Gizle" /> :<AiOutlineEye title= "Şifre'yi Göster" />}</span> : null
                }

            </label>
        </div>
    )
}

export default InputWithIcon
