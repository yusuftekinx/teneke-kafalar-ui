import React from 'react'
import './Products.css'
import '../Css/Global.css'
import Card from './Card/Card'
import HobsGame from '../../img/game-hobs.jpg'
import FeignGame from '../../img/game-feign.jpg'
import ScrollAnimation from 'react-animate-on-scroll'

function Products() {


    const feignUrl = 'https://store.steampowered.com/app/1436990/Feign/'
    const hobsUrl = 'https://store.steampowered.com/app/1114860/Hobs/'

    return (
        <div className="products-component">
            <div className="component-header">
                <h3 className="poppinsText">Oyunlar</h3>
            </div>
            <ScrollAnimation animateIn="bounce">
                <div className="component-content">
                    <Card url = {feignUrl} image={HobsGame} header={'Hobs'} />
                    <Card url = {hobsUrl} image={FeignGame} header={'Feign'} />
                </div>
            </ScrollAnimation>

        </div>
    )
}

export default Products
