import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "./context";

const SingleMovies = () => {
  const { id } = useParams();

  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovie(`${API_URL}&i=${id}`);
    }, 400);
    return () => clearTimeout(timerOut);
  }, [id]);
  if (isloading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
    }
  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.title}</p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating}</p>
          <p className="card-text">{movie.Country}</p>
        </div>


      </div>
    </section>
  );
  
};

export default SingleMovies;
