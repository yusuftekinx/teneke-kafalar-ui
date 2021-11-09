import React from 'react'
import { Link } from 'react-router-dom'

function SingleMenu({path,menuText,menuIcon,clickEvent,mobileType}) {



    return (
        <Link to = {path} className = "singleMenu" onClick = {clickEvent}>
            <span className = "icon">{menuIcon}</span>
            {
                mobileType === true ? null : <span className  ="single-menu-text openSansText">{menuText}</span>
            }
        </Link>
    )
}

export default SingleMenu
