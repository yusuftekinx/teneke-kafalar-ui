import React from 'react'
import './SocialMediaArea.css'
import '../Css/Global.css'
import ScrollAnimation from 'react-animate-on-scroll'
import Media from './Media'
import Instagram from '../../img/instagram-icon.png'
import Twitch from '../../img/twitch-icon.png'
import Youtube from '../../img/youtube-icon.png'
import Email from '../../img/email-icon.png'


function SocialMediaArea() {
    return (
        <div className="sm-component">
            <div className="component-header">
                <h3 className="poppinsText">Bizi Takip Edin</h3>
            </div>
                <ScrollAnimation animateIn = 'bounce'>
                <div className="component-content">
                    <a target='_blank' className = "smLinks" href = "https://twitch.com"><Media image = {Twitch} smName = {'Twitch'} /></a>
                    <a target='_blank' className = "smLinks" href = ""><Media image = {Instagram} smName = {'Instagram'} /></a>
                    <a target='_blank' className = "smLinks" href = "" > <Media image = {Email} smName = {'E-Posta'} /></a>
                    <a target='_blank' className = "smLinks" href = ""><Media image = {Youtube} smName = {'Youtube'} /></a>
                </div>

                </ScrollAnimation>

        </div>
    )
}

export default SocialMediaArea
