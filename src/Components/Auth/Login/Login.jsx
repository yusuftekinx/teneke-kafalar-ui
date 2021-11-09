import React, { useEffect, useState } from 'react'
import './Login.css'
import Navbar from '../../Navbar/Navbar'
import RegisterImage from '../../../img/geciciResimRegister.png'
import TKLogo from '../../../img/tk-logo.png'
import { Canvas } from '@react-three/fiber'
import Circle from '../../3D/Circle'
import '../../Css/Global.css'
import { FaUserAlt, RiLockPasswordLine } from 'react-icons/all'
import InputWithIcon from '../InputWithIcon/InputWithIcon'
import { Link, useHistory } from 'react-router-dom'
import { LoginRequest } from '../../../Service/Auth/Auth'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import { homeRedirect } from '../../../Helper/Redirect/RedirectHome'
import { bindActionCreators } from 'redux'
import { onChangeStateToUser, onSaveUserToken } from '../../../Redux/actions/Actions'
import SpinnerSVG from '../../../img/spinner.svg'

function Login(props) {

    let history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formStatus, setFormStatus] = useState(false);

    const changeShowPasswordState = () => {
        setShowPassword(!showPassword)
    }


    const onSetUsername = (username) => {
        setUsername(username)
    }

    const onSetPassword = (password) => {
        setPassword(password)
    }

    const clearInputs = () => {
        setUsername("")
        setPassword("")
    }

    const sendRequest = () => {
        setFormStatus(true);
        LoginRequest(username, password).then(async (response) => {
            localStorage.setItem('access_token', response.data.token)
            await props.action[1](onSaveUserToken(response.data.token))
            await props.action[0](onChangeStateToUser(response.data.user))
            setTimeout(() => {
                history.push('/community')
            }, 2000);
        }).catch(err => {
            setTimeout(() => {
                toast.error(err.response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    bodyStyle: { fontSize: '14px' }

                })
            }, 1500);
        }).finally(() => {
            setTimeout(() => {
                setFormStatus(false)
            }, 1500);
        })
    }


    const onSendRequest = async (e) => {
        e.preventDefault();
        await sendRequest();
        clearInputs();

    }

    useEffect(() => {
        homeRedirect(props, history)
    }, [])

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
                    <Circle position={[-2.4, 1.5, 0]} size={[0.5, 0.5, 0.5]} />
                </Canvas>
                <div className="register-form">
                    <div className="leftArea">
                        <img draggable="false" src={RegisterImage} id="registerImage"></img>
                        <span className="openSansText register-text">Hesabınızda Oturum Açın</span>
                    </div>
                    <div className="formArea">
                        <div className="header">
                            <img src={TKLogo}></img>
                        </div>
                        <div className="form">
                            <form onSubmit={onSendRequest} style={{ width: '100%' }}>
                                <InputWithIcon value={username} onChangeEvent={onSetUsername} htmlFor={'usernameInput'} type={'text'} placeholder={'Kullanıcı Adı'} icon={<FaUserAlt />} />
                                <InputWithIcon value={password} onChangeEvent={onSetPassword} htmlFor={'passwordInput'} passStatus={showPassword} isPasswordInput={true} changeShowPasswordState={changeShowPasswordState} type={showPassword === true ? 'text' : 'password'} placeholder={'Şifre'} icon={<RiLockPasswordLine />} />
                                <button type="submit" className="tkButton mt20">
                                    {formStatus === false ? "Devam Et" : <img src={SpinnerSVG} width="16" style={{ position: 'relative', top: '3px' }} height="16"></img>}
                                </button>
                            </form>

                            <Link to="/register" className="ialreadyAcc">Hesap Oluştur</Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        action: bindActionCreators([onChangeStateToUser,onSaveUserToken], dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
