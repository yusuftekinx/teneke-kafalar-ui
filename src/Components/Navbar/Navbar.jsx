import React, { useEffect, useState } from 'react'
import './Navbar.css'
import TKLogo from '../../img/tk-logo.png'
import hamburgerMenu from '../../img/hamburgerMenu.png'
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
function Navbar(props) {

    const [menuStatus, setMenuStatus] = useState(false);
    const [windowWidth,setWindowWidth] = useState(null);
    const [userName,setUsername] = useState("")
    window.addEventListener('resize', function(event) {
        setWindowWidth(event.target.screen.width)
    }, true);


    const {email,username,role} = props.user;


    useEffect(() => {
        if(windowWidth > 1000){
            setMenuStatus(false)
        }
    },[windowWidth])

    useEffect(() => {
        setUsername(username);
    },[])

    return (
        <div className="navbar">

            <div className="logo-and-name">
                <img src={TKLogo} draggable="false" alt="TKLogo" id="tkLogo"></img>
                <span id="tk-text">Teneke Kafalar<small>(Beta)</small></span>
            </div>
            <div className="menu">
                <span className="mobile-menu-icon" onClick={() => { setMenuStatus(!menuStatus) }}>
                    <img src={hamburgerMenu} id="hamburgerMenu" alt='Hamburger Menu'></img>
                </span>

                <span className = "mobile-menu" style = {{display:menuStatus===true ? 'flex' : 'none'}}>
                    <ul id="menu-ul-mobile">
                        <li className="menu-li-mobile poppinsText"><Link to = "/we-about">Hakkımızda</Link></li>
                        <li className="menu-li-mobile poppinsText">Güncellemeler</li>
                        <li className="menu-li-mobile poppinsText">Oturum Aç</li>
                        <li className="menu-li-mobile poppinsText" id="sign-up-mobile"><Link to = "/register" >Hesap Oluştur</Link></li>
                    </ul>
                </span>

                <ul id="menu-ul">
                    <Link to = "" className="menu-li">Hakkımızda</Link>
                    <Link to = "" className="menu-li">Güncellemeler</Link>
                    
                    {username === "" ? <Link to = "/login" className="menu-li">Oturum Aç</Link> : <Link to = {`/${userName}`} className = "menu-li">{userName}</Link>  }
                    {username === "" ? <Link className = "menu-li" to = "/register"  id="sign-up"><li>Hesap Oluştur</li></Link> : <Link to = "/community" className = "menu-li" id = "sign-up">Ev'e Git</Link>}

                </ul>
            </div>

        </div>
    )
}


const mapStateToProps = (state) => {
    return state;
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         action:bindActionCreators(...,dispatch)
//     }
// }

export default connect(mapStateToProps)(Navbar)
