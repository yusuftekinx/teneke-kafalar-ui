import React, { useEffect, useRef, useState } from 'react'
import './Register.css'
import Navbar from '../../Navbar/Navbar'
import RegisterImage from '../../../img/geciciResimRegister.png'
import TKLogo from '../../../img/tk-logo.png'
import { Canvas } from '@react-three/fiber'
import Circle from '../../3D/Circle'
import '../../Css/Global.css'
import { FaUserAlt, MdOutlineMail, RiLockPasswordLine } from 'react-icons/all'
import InputWithIcon from '../InputWithIcon/InputWithIcon'
import { Link,useHistory} from 'react-router-dom'
import { RegisterRequest } from '../../../Service/Auth/Auth'
import { toast, ToastContainer } from 'react-toastify'
import { homeRedirect } from '../../../Helper/Redirect/RedirectHome'
import { connect } from 'react-redux'
function Register(props) {


    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const changeShowPasswordState = () => {
        setShowPassword(!showPassword)
    }


    const onSetUsername = (username) => {
        setUsername(username)
    }

    const onSetEmail = (email) => {
        setEmail(email)
    }

    const onSetPassword = (password) => {
        setPassword(password)
    }

    const clearInputs = () => {
        setUsername("")
        setPassword("")
        setEmail("")
    }

    let history = useHistory();

    useEffect(() => {
        homeRedirect(props,history);
    })

    const sendRequest = () => {
        RegisterRequest(username, password, email).then(response => {
            toast.success(response.data.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyStyle:{fontSize:'14px'}  
                })
        }).catch(err => {
            toast.error(err.response.data.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                bodyStyle:{fontSize:'14px'}  
                })
        })
    }


    const onSendRequest = async(e) => {
        e.preventDefault();
        await sendRequest();
        clearInputs();

    }

    return (
        <div className="register-page">
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Canvas style={{ position: 'absolute' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Circle position={[-2.4, 1.5, 0]} size= {[0.4,0.4,0.4]} />
            </Canvas>
            <div className="register-form">
                <div className="leftArea">
                    <img draggable="false" src={RegisterImage} id="registerImage"></img>
                    <span className="openSansText register-text">Yeni Hesap Oluştur</span>
                </div>
                <div className="formArea">
                    <div className="header">
                        <img src={TKLogo}></img>
                    </div>
                    <div className="form">
                        <form onSubmit={onSendRequest} style={{ width: '100%' }}>
                            <InputWithIcon value = {email} onChangeEvent={onSetEmail} htmlFor={'emailInput'} type={'email'} placeholder={'E-Posta'} icon={<MdOutlineMail />} />
                            <InputWithIcon value = {username} onChangeEvent={onSetUsername} htmlFor={'usernameInput'} type={'text'} placeholder={'Kullanıcı Adı'} icon={<FaUserAlt />} />
                            <InputWithIcon value = {password} onChangeEvent={onSetPassword} htmlFor={'passwordInput'} passStatus={showPassword} isPasswordInput={true} changeShowPasswordState={changeShowPasswordState} type={showPassword === true ? 'text' : 'password'} placeholder={'Şifre'} icon={<RiLockPasswordLine />} />

                            <button type="submit" className="tkButton mt20">Tamamla</button>
                        </form>

                        <Link to="/login" className="ialreadyAcc">Şimdi Giriş Yap</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Register)