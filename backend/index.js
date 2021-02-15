const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');


const bodyParser = require('body-parser');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mybooks'
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen('3002',() => {
    console.log('Running!');
})

app.post('/api/insert',(req,res) => {

    const bookCover = req.body.bookCover;
    const bookTitle = req.body.bookTitle;
    const bookDesc = req.body.bookDesc;

    const qInsert = "INSERT INTO `books` (`bookCover`,`bookTitle`,`bookDesc`) VALUES (?, ?, ?)"

    db.query(qInsert,[bookCover, bookTitle, bookDesc], (err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    })

})

app.get('/api/get', (req,res) => {
    const qSelect = "SELECT * FROM books";
    db.query(qSelect,(err,result) => {
        res.send(result);
    })
})