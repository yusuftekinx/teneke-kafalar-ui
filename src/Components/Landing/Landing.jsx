import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Products from '../Products/Products'
import SocialMediaArea from '../SocialMediaArea/SocialMediaArea'
import Welcome from '../WelcomeArea/Welcome'
import './Landing.css'
function Landing() {
    return (
        <div className = "landing-component">
            <Navbar />
            <Welcome />
            <Products />
            <SocialMediaArea />
            <Footer />
        </div>
    )
}

export default Landing
