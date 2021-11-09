import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { BiLogOut, RiDashboardLine, FiUsers, FiHelpCircle, FiSettings ,MdLiveTv, MdOutlineHowToVote,IoNewspaperOutline,AiOutlineNotification} from 'react-icons/all'
import SingleMenu from './SingleMenu'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import Square from '../3D/Square'
import { Canvas } from '@react-three/fiber'
function Sidebar({ user, ...props }) {

    let history = useHistory()
    let [mobileType, setMobileType] = useState(false)
    let [windowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener('resize', (e) => {
        setWindowWidth(e.target.screen.width);
    })


    useEffect(() => {
        if (windowWidth < 1000) {
            setMobileType(true)
        }
        if (windowWidth > 1000) {
            setMobileType(false)
        }
    }, [windowWidth])

    let logout = async () => {
        await localStorage.removeItem('access_token');
        window.location.href = '/login'
    }

    return (
        <div className="sidebar">
            <div className="logo-and-Name">
                {
                    windowWidth < 1000 ? null : <span className="app-text cursiveText">Teneke Kafalar<small>(Beta)</small></span>
                }
            </div>
            <hr style={{ width: "100%" }} className="mt20"></hr>
            <div className="sidebar-menu">
                <div className="top-menu">
                    <SingleMenu mobileType={mobileType} path={'/'} menuText={'Anasayfa'} menuIcon={<RiDashboardLine />} />
                    <SingleMenu mobileType={mobileType} path={'/community'} menuText={'Topluluk'} menuIcon={<FiUsers />} />
                    <SingleMenu mobileType={mobileType} path={'/vote'} menuText={'Oylama'} menuIcon={<MdOutlineHowToVote />} />
                    <SingleMenu mobileType={mobileType} path = {'/recent-releases'} menuText={'Yayınlar'} menuIcon={<MdLiveTv />} />
                    <SingleMenu mobileType={mobileType} path = {'/news'} menuText={'Haberler'} menuIcon={<IoNewspaperOutline />} />
                    <SingleMenu mobileType={mobileType} path = {'/notification'} menuText={'Bildirim'} menuIcon={<AiOutlineNotification />} />

                    
                </div>
                <div className="bottom-menu">
                    <SingleMenu mobileType={mobileType} path ={'/settings'} menuText = {'Ayarlar'} menuIcon = {<FiSettings />} />
                    <SingleMenu mobileType={mobileType} path={'/help'} menuText={'Yardım'} menuIcon={<FiHelpCircle />} />
                    <SingleMenu mobileType={mobileType} menuText={'Çıkış Yap'} clickEvent={logout} menuIcon={<BiLogOut />} />
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(Sidebar)
