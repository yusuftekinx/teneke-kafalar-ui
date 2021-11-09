import React from 'react'

function Media({image,smName}) {
    return (
        <div className = "media">
            <div className = "image">
                <img src = {image} alt='sm'></img>
            </div>
            <div className = "poppinsText smName">{smName}</div>
        </div>
    )
}

export default Media
