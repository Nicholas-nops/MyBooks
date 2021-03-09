import React, { useState, useEffect } from 'react';
import axios from 'axios';
import addIcon from '../../img/libraryadd.svg'
import removeIcon from '../../img/removeIcon.svg'
import './card.css'

export default function Card() {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/api/get').then(res => {
            setBookList(res.data);
        })
    }, [])

    return (

        <div>
            {bookList.map((book) => {
                return (
                    <div className="card" key={book.ID}>
                        <img src={book.bookCover} alt="capa" style={style.img}></img>
                       
                            <h4><b>{book.bookTitle}</b></h4>
                            <p>{book.bookDesc}</p>
                            <div>
                            <button className='btnReaded'>Alredy read <span className=""><img alt="add" src={addIcon}></img></span></button>
                            </div>
                            <div>
                            <button className='btnDelete'>Delete <span className=""><img alt="add" src={removeIcon}></img></span></button>
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
