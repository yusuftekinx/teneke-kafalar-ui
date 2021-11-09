import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router';
import { loginRedirect } from '../../Helper/Redirect/LoginRedirect';
import AdminAccountWarning from '../AdminAccountWarning/AdminAccountWarning';
import Sidebar from '../Sidebar/Sidebar';
import './Home.css'
function Home(props) {

    let history = useHistory();
    useEffect(() => {
        loginRedirect(props,history)
    },[])

    return (
        <div className = "home-component">
            <div className = "home-left">
                <Sidebar />
            </div>
            <div className ="home-right">
                <AdminAccountWarning role= {props.user.role} />
                {props.component}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps)(Home)
