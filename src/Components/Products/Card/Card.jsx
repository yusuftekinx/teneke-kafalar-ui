import React from 'react'
import './Card.css'
export default function Card({ url,image, header }) {
    return (
        <div className="card">
            <div className="image">
                <img draggable = "false" src={image} alt={image}></img>
            </div>
            <div className="header-and-content">
            
                <span className = "poppinsText header">{header}</span>
                <a target='_blank' href = {url} type = 'button' className = "tkButton incele-button">Şimdi Oyna</a>
            </div>
        </div>
    )
}
