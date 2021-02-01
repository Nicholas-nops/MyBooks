import React, { useState } from 'react';
import './willread.css';
import 'material-icons';
import 'materialize-css'
import Card from '../../card/card';
import axios from 'axios';
import { encode } from 'base-64';


export default function WillRead() {
    const [modal, showModal] = useState(false);
    const [bookCover, setCover] = useState('');
    const [bookTitle, setTtile] = useState('');
    const [bookDesc, setDesc] = useState('');

    function handleForm(e) {
        e.preventDefault();
        if (e.target.bookCover !== "" && e.target.bookTitle.value !== "" && e.target.bookDesc.value !== "") {
            setCover(encode(e.target.bookCover.files));
            setTtile(e.target.bookTitle.value);
            setDesc(e.target.bookDesc.value);
            //console.log(bookCover)
            handleUpload();
        }
    }
    function handleUpload() {

        /*         let bookData = {
                    "bookCover": bookCover,
                    "bookTitle": bookTitle,
                    "bookDesc": bookDesc
                } */
         let bookData = {
            "bookData": [
                { "bookCover": bookCover },
                { "bookTitle": bookTitle },
                { "bookDesc": bookDesc }
            ]
        } 
        const headers = { 'Content-Type': 'application/json' }

        let formData = new FormData();
        formData.append("bookCover", bookCover);
        formData.append("bookTitle", bookTitle);
        formData.append("bookDesc", bookDesc);

        const url = "http://localhost:80/react-backend/index.php"
        axios.post(url,
            bookData,
            {headers: headers}
        )
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className='body'>
            <div className="formdiv3">
                <Card />
                <button className='btn3' onClick={() => (showModal(modal ? false : true))} ><span className="material-icons btn3">library_add</span></button>
                {
                    modal ?
                        <div className='modalBody'>
                            <div className="modal-content">
                                <form onSubmit={handleForm}>
                                    Book cover: <input placeholder="Book ISBN" type="file" id="bookCover" className="modal__book_cover" />
                                    <input placeholder="Book Title" type="text" id="bookTitle" className="modal__book__title" />
                                    <input placeholder="Short description" id="bookDesc" type="text" className="modal__book__description" />
                                    <input className='btnSend' type="submit" value="add" />
                                    <button className='btnClose' onClick={() => (showModal(false))}>Cancel</button>
                                </form>
                            </div>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    )


}


