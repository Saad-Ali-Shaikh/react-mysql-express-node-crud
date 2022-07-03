const express = require("express");
const app = express();
const mysql = require("mysql");
// const { bodyParser } = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "movies_db",
});

app.use(cors());
app.use(express.json());

app.get("/api/get/", (req, res) => {
  const sqlSelect = "Select * from movies_reviews";
  db.query(sqlSelect, (err, result) => {
    if (err) throw err;
    //res.send(result);
    res.status(200).send({ movieReviewList: result });
  });
});

app.post("/api/insert", (req, res) => {
  const sqlInsert =
    "insert into movies_reviews (moviename,moviereview) VALUES (?,?);";
  db.query(
    sqlInsert,
    [req.body.movieName, req.body.movieReview],
    (err, result) => {
      //console.log("Done");
      //console.log(result);
      res.status(200).send("ok");
    }
  );
});

app.delete("/api/delete/:movieName", (req, res) => {
  const movie_Name = req.params.movieName;
  const sqlDeleteQuery = "DELETE from movies_reviews where movieName = ?";
  db.query(sqlDeleteQuery, movie_Name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const movie_Name = req.body.movieName;
  const movie_Review = req.body.movieReview;
  const sqlUpdateQuery =
    " UPDATE movies_reviews set movieReview = ? where movieName = ?";
  db.query(sqlUpdateQuery, [movie_Review, movie_Name], (err, result) => {
    if (err) console.log(err);
  });
});

app.get("/", (req, res) => {
  res.send("Hello empty world");
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
