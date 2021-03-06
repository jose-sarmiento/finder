import React from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context";

const Modal = ({ isOpen, setIsOpen }) => {
	const {
		state: { favorites },
		dispatch,
	} = useGlobalContext();

	const handleFavoriteRemove = (id) => {
		dispatch({ type: "REMOVE_ITEM_TO_STORAGE", payload: id });
		localStorage.setItem(
	        "moviedb.favorites",
	        JSON.stringify(favorites.filter(x => x.id !== id))
	      );
	};

	return (
		<div className={isOpen ? "modal modal--show" : "modal"}>
			<FaTimes
				className="modal__close"
				onClick={() => setIsOpen(false)}
			/>
			<h2 className="modal__h2">My Favorites</h2>

			{favorites.length === 0 && (
				<span className="nofavorites">
					Currently no favorite movie added
				</span>
			)}
			{favorites.map((fav) => (
				<div className="modal__row" key={fav.id}>
					<img
						src={`https://image.tmdb.org/t/p/w154${fav.poster_path}`}
						alt="moviename"
						className="modal__image"
					/>
					<span className="modal__title">{fav.original_title}</span>
					<BsHeartFill
						className="modal__heart"
						onClick={() => handleFavoriteRemove(fav.id)}
					/>
				</div>
			))}
		</div>
	);
};

export default Modal;
