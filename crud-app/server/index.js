const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require("mysql2");

const db=mysql.createPool({
    host: "localhost",
    user:"root",
    password:"ritikAbes$2662",
    database: "CRUDDataBase"
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.get("/", (req, res) => {
    // const sqlInsert = "insert into CRUDDataBase.movie_reviews (MovieName, movieReviews) values ('URI', 'good movie');";
    // const sqlSelect="select * from CRUDDataBase.movie_reviews;"
    // db.query(sqlSelect, (err, result) => {
    //     if(err) {
    //         console.log("error")
    //         return console.log(err)
    //     }
    //     res.send('Hello');
    //     console.log("no error")
    //     return console.log(result);
    // });

// });

app.get("/api/get", (req, res) => {
    const sqlSelect = "select * from CRUDDataBase.movie_reviews;"
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "insert into CRUDDataBase.movie_reviews (MovieName, movieReviews) values (?, ?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err)
        console.log(result)
    })
})

app.listen(3000, () => {
    console.log('app is running')
});
