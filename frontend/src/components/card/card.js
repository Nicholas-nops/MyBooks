import React, { useState, useEffect } from 'react';
import axios from 'axios';
import addIcon from '../../img/libraryadd.svg'
import removeIcon from '../../img/removeIcon.svg'
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
                       
                            <h4><b>{book.bookTitle}</b></h4>
                            <p>{book.bookDesc}</p>
                            <div>
                            <button className='btnReaded'>Alredy read <span className=""><img src={addIcon}></img></span></button>
                            </div>
                            <div>
                            <button className='btnDelete'>Delete <span className=""><img src={removeIcon}></img></span></button>
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
