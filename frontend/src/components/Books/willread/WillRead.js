import React, { useState } from "react";
import "./willread.css";
import "material-icons";
import "materialize-css";
import Card from "../../card/card";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { storage } from "../../../firebase/firebase";

export default function WillRead() {
  const [modal, showModal] = useState(false);
  const [bookCover, setCover] = useState(null);
  const [bookTitle, setTtile] = useState("");
  const [bookDesc, setDesc] = useState("");

  const handleImg = () => {
    let imgID = uuidv4();

    if (bookCover === "" && bookTitle === "" && bookDesc === "") {
      alert("Some of the fields are empty");
    } else {
      const uploadTask = storage.ref(`images/${imgID}`).put(bookCover);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(imgID)
            .getDownloadURL()
            .then((url) => {
              let bookData = {
                bookCover: url,
                bookTitle: bookTitle,
                bookDesc: bookDesc,
              };
              axios.post("http://localhost:3002/api/insert", bookData);
            });
        }
      );
    }
  };

  return (
    <div className="modal__container">
      <Card />
      <button
        className="modal__open__button"
        onClick={() => showModal(modal ? false : true)}
      >
        <span className="material-icons btn3">library_add</span>
      </button>
      {modal ? (
        <div className="modal__body">
          <div className="modal__content">
            Book cover:{" "}
            <input
              placeholder="Book ISBN"
              onChange={(e) => setCover(e.target.files[0])}
              type="file"
            />
            <input
              placeholder="Book Title"
              onChange={(e) => setTtile(e.target.value)}
              type="text"
              id="bookTitle"
              className="modal__book__title"
            />
            <textarea
              placeholder="Short description"
              onChange={(e) => setDesc(e.target.value)}
              id="bookDesc"
              type="text"
              className="modal__book__description"
            ></textarea>
            <input
              className="modal__btn__send"
              onClick={handleImg}
              type="submit"
              value="add"
            />
            <button
              className="modal__btn_close"
              onClick={() => showModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
