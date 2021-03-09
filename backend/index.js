const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "nicholasnop",
  password: "123",
  database: "mybooks",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen("3002", () => {
  console.log("Running!");
});

app.post("/api/insert", (req, res) => {
  const bookCover = req.body.bookCover;
  const bookTitle = req.body.bookTitle;
  const bookDesc = req.body.bookDesc;

  const qInsert =
    "INSERT INTO `books` (`bookCover`,`bookTitle`,`bookDesc`) VALUES (?, ?, ?)";

  db.query(qInsert, [bookCover, bookTitle, bookDesc], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("texto" + req.body.bookCover);
    }
  });
});

app.get("/api/get", (req, res) => {
  const qSelect = "SELECT * FROM books";
  db.query(qSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/status", (req, res) => {
  const statusTo = req.body.bookStatus;
  const bookID = req.body.bookID;
  console.log(statusTo, bookID);
  const qUpdate =
    "UPDATE books SET bookStatus='" + statusTo + "' WHERE ID='" + bookID + "'";
  db.query(qUpdate, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

app.post("/api/remove", (req, res) => {
  const bookID = req.body.bookID;

  qDelete = "DELETE FROM books * WHERE ID='" + bookID + "'";
  db.query(qDelete, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});
