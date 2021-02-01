import React from 'react'
import capa from './capa.jpg'
import './card.css'

export default function Card() {
    return (
        <div className="card">
            <img src={capa} alt="capa" style={style.img}></img>
            <div className="container">
                <h4><b>Test title</b></h4>
                <p>Test description</p>
            </div>
        </div>
    )
}

const style = {
    img : {
        width: '50%',
        textAlign: 'center',
        marginTop: '5px'  
    }
}
