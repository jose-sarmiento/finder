import React, {useCallback} from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import Stars from "./Stars";
import { useHistory } from "react-router-dom";
import { useGlobalContext } from "../context";

function Movie(props) {
  const { id, original_title, poster_path, release_date, vote_average } = props;
  const {
    state: { favorites, searchTerm },
    dispatch,
  } = useGlobalContext();
  const history = useHistory();

  const isFavorite = (id) => {
    return favorites.find((f) => f.id === id);
  }
  const handleFavoriteAdd = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_ITEM_TO_STORAGE",
      payload: { id, original_title, poster_path },
    });
    localStorage.setItem(
      "moviedb.favorites",
      JSON.stringify([...favorites, { id, original_title, poster_path }])
    );
  };

  const handleOnClick = useCallback(() => {
    if(searchTerm) {
      dispatch({type: "CLEAR_SEARCH"})
    }
    history.push(`/movie/${id}`)
     // eslint-disable-next-line
  }, [history]);

  return (
    <div onClick={handleOnClick}>
      <div className="movie">
        <div className="movie-image">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt="poster"
          />
        </div>
        <div className="row stars">
          {vote_average && <Stars count={vote_average} />}
          {isFavorite(id) ? (
            <BsHeartFill className="row__heart" onClick={handleFavoriteAdd} />
          ) : (
            <BsHeart className="row__heart" onClick={handleFavoriteAdd} />
          )}
        </div>
        <div className="row">
          <span className="value">{original_title}</span>
        </div>
        <div className="row">
          <span className="value">{release_date}</span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
