import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

import { ref, push, child, update } from "firebase/database";
const initialState = { movieName: "", review: "" };

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieRList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      if (response.status == 200) setMovieRList(response.data.movieReviewList);
    });
  }

  const deleteReview = (movie) => {
    Axios.delete("http://localhost:3001/api/delete/" + movie).then((res) => {
      //loadReviews();
    });
    loadReviews();
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    }).then((response) => {
      //  loadReviews();
    });
    //setNewReview("");
    loadReviews();
  };
  const submitReviewToDB = () => {
    const m_name = movieName;
    const m_review = review;

    Axios.post("http://localhost:3001/api/insert", {
      movieName: m_name,
      movieReview: m_review,
    }).then((response) => {
      if (response.status == 200 && response.data == "ok") {
        loadReviews();
        // setTimeout(() => {
        //   setMovieName("");
        //   setReview("");
        // }, 2000);
        resetForm();
      }
    });
  };
  const resetForm = () => {
    this.setState(function (state, props) {
      return {
        movieName: "",
        review: "",
      };
    });
  };
  const keepStateUpdatedName = (e) => {
    setMovieName(e.target.value);
  };
  const keepStateUpdatedReview = (e) => {
    setReview(e.target.value);
  };
  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          id="movieName"
          onChange={keepStateUpdatedName}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          id="review"
          onChange={keepStateUpdatedReview}
        />
        <button type="submit" onClick={submitReviewToDB}>
          Save to DB
        </button>
        {movieReviewList.map((val, index) => {
          return (
            <div className="card" key={index}>
              <h1>{val.movieName} </h1>
              <p>{val.movieReview} </p>
              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              ></input>
              <button
                onClick={(e) => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
