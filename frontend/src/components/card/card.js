import React, { useState, useEffect } from 'react';
import axios from 'axios';
import capa from './capa.jpg'
import './card.css'

export default function Card() {
    const [bookList, setBookList] = useState([]);
    const books = [];

    useEffect(() => {
        axios.get('http://localhost:3002/api/get').then(res => {
            setBookList(res.data);
        })
    }, [bookList])

    return (

        <div>
            {bookList.map((book) => {
                return (
                    <div className="card">
                        <img src={book.bookCover} alt="capa" style={style.img}></img>
                        <div className="container">
                            <h4><b>{book.bookTItle}</b></h4>
                            <p>{book.bookDesc}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

const style = {
    img: {
        width: '50%',
        textAlign: 'center',
        marginTop: '5px'
    }
}
