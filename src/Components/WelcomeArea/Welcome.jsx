import React from 'react'
import './Welcome.css'
import '../Css/Global.css'
import WelcomeImage from '../../img/welcome-image.svg'
function Welcome() {
    return (
        <div className="welcome-component">
            <div className="welcome-text-and-content">
                <div className="welcome-text">
                    <b>Teneke Kafalar</b> Web Uygulaması
                </div>
                <div className="welcome-content">
                    “Farklı girişimlerde bulunduğunda insanlar seni
                    boş işle uğraşan ‘Teneke Kafalı’ biri olarak görür.
                    Ancak sen diğer insanların aksine hazır yolları tercih  etmeyen, kendi yolunu kendi çizmek isteyen,harika  fikirleri,harika hayalleri olan bir insansın.Bu yüzden onları hiç kafana takmaz aksine gülersin. Çünkü değişimi sağlayacak bir şeyler için çalışıyorsun.”
                </div>
                <button className = "tkButton joinButton">Aramıza Katıl</button>
            </div>
            <div className="welcome-page-image">
                <img src={WelcomeImage} draggable = "false" id="welcome-image"></img>
            </div>
        </div>
    )
}

export default Welcome
