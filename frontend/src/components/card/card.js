import React, { useState, useEffect } from "react";
import axios from "axios";
import addIcon from "../../img/libraryadd.svg";
import removeIcon from "../../img/removeIcon.svg";
import "./card.css";

export default function Card({ bookStatus }) {
  const [bookList, setBookList] = useState([]);

  const attStatus = (e) => {
    //console.log(e.target.id);
    let bookData = {
      bookID: e.target.id,
      bookStatus: "Alredyread",
    };

    axios.post("http://localhost:3002/api/status", bookData);
  };

  const removeBook = (e) => {
    const bookID = e.target.id;
    axios.post("http://localhost:3002/api/remove", bookID);
  };
  useEffect(() => {
    axios.get("http://localhost:3002/api/get").then((res) => {
      setBookList(res.data);
    });
  }, [bookList]);

  return (
    <div>
      {bookList.map((book) => {
        return (
          <div className="card" key={book.ID}>
            <img src={book.bookCover} alt="capa" style={style.img}></img>

            <h4>
              <b>{book.bookTitle}</b>
            </h4>
            <p>{book.bookDesc}</p>
            <div>
              <button onClick={attStatus} id={book.ID} className="btnReaded">
                {bookStatus}{" "}
                <span className="">
                  <img alt="add" src={addIcon}></img>
                </span>
              </button>
            </div>
            <div>
              <button id={book.ID} onClick={removeBook} className="btnDelete">
                Delete{" "}
                <span className="">
                  <img alt="add" src={removeIcon}></img>
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const style = {
  img: {
    width: "50%",
    textAlign: "center",
    marginTop: "5px",
  },
};
