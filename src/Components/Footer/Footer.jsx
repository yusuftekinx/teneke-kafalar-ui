import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import './Footer.css'
export default function Footer() {
    return (
        <ScrollAnimation animateIn={'fadeIn'} >
            <div className = "footer">
                <h4 className = "footerText poppinsText">tenekekafalarstudios</h4>
            </div>
        </ScrollAnimation>
    )
}
