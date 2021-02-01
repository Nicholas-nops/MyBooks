import React, { useState } from 'react'
import './main.css'
import logo from '../../img/logo.png'
import AlredyRead from '../Books/AlredyRead/AlredyRead'
import Reading from '../Books/Reading/Reading';
import WillRead from '../Books/willread/WillRead';
export default function Body() {
    const [btn,setBtn] = useState(false);
    const [btn2,setBtn2] = useState(false);
    const [btn3,setBtn3] = useState(false);



    return (
        <div className="container">
            <div className="header" >
                <img src={logo} alt="logo" />
            </div>
            <div className="buttons">
                <button className='btn' onClick={() => (setBtn(btn ? false : true), setBtn2(false),setBtn3(false))}>Already read</button>
                <button className='btn' onClick={() => (setBtn2(btn2 ? false : true),setBtn(false), setBtn3(false))}>Reading now</button>
                <button className='btn' onClick={() => (setBtn3(btn3 ? false : true), setBtn2(false),setBtn(false))}>Will read</button>
            </div>
            <div className="forms">
                { btn ? <AlredyRead/> : '' }
                { btn2 ? <Reading/> : '' }
                { btn3 ?<WillRead/> : '' }    
            </div>
        </div>
    )
}
