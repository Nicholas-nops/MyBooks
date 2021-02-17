import React, { useState } from 'react';
import './willread.css';
import 'material-icons';
import 'materialize-css'
import Card from '../../card/card';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { storage } from '../../../firebase/firebase';


export default function WillRead() {
    const [modal, showModal] = useState(false);
    const [bookCover, setCover] = useState('');
    const [bookTitle, setTtile] = useState('');
    const [bookDesc, setDesc] = useState('');
    const [bookUrl,setUrl] = useState('');

    const handleUpload = async () => {
        let imgID = uuidv4();


        const uploadTask = storage.ref(`images/${imgID}`).put(bookCover);
        uploadTask.on(
            'state_changed',
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                storage
                .ref('images')
                .child(imgID)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                    console.log(bookUrl);
                })  
            }
            );

          let bookData = {
               "bookCover": await bookUrl,
               "bookTitle": bookTitle,
               "bookDesc": bookDesc,
           }
           axios.post('http://localhost:3002/api/insert', bookData) 
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
                                Book cover: <input placeholder="Book ISBN" onChange={(e) => setCover(e.target.files[0])} type="file" id="bookCover" className="modal__book_cover" />
                                <input placeholder="Book Title" onChange={(e) => setTtile(e.target.value)} type="text" id="bookTitle" className="modal__book__title" />
                                <input placeholder="Short description" onChange={(e) => setDesc(e.target.value)} id="bookDesc" type="text" className="modal__book__description" />
                                <input className='btnSend' onClick={handleUpload} type="submit" value="add" />
                                <button className='btnClose' onClick={() => (showModal(false))}>Cancel</button>
                            </div>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    )


}


