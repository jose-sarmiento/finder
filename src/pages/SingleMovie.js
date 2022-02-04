import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ProductionCompanies from "../components/ProductionCompanies";
import { useGlobalContext } from "../context";

function SingleMovie() {
  const { state } = useGlobalContext();
  const {searchTerm} = state
  const { id } = useParams();
  const history = useHistory();

  const [details, setDetails] = useState({});
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if(searchTerm) return history.push(`/`)
  }, [searchTerm, history])

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=121990254cea216e5b7bdf8afd80c451`
      );
      const data = await response.json();
      const { production_companies } = data;
      setDetails(data);
      setCompanies(production_companies);
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="single-movie-container">
      <div className="img-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
          alt={details.original_title}
        />
      </div>
      <div className="details">
        <span className="desc">Title :</span>
        <p className="value">{details.original_title}</p>
        <span className="desc">Overview :</span>
        <p>{details.overview}</p>
        <span>Vote average :</span>
        <p>{details.vote_average}</p>
        <span>Vote count :</span>
        <p>{details.vote_count}</p>
        <span>Popularity :</span>
        <p>{details.popularity}</p>
        <div className="title">
          <h4>Production Companies</h4>
        </div>
        <ProductionCompanies companies={companies} />
        <div className="link">
          <a href={details.homepage} target="_blank" rel="noreferrer">
            Visit its website to learn more about the movie
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
