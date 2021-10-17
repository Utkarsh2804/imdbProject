import React from "react";

const IMAGE_API = "https://image.tmdb.org/t/p/w500";

const Movie = ({ title, backdrop_path, vote_average, release_date, vote_count }) => {


    const setRatingClass = (vote) => {
        if (vote >= 8) {
            return "green";
        } else if (vote >= 6) {
            return "orange";
        } else {
            return "red";
        }
    };

    const setVoteClass = (count) => {
        if (count >= 500) {
            return "green";
        } else if (count >= 100) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <div className="movie">
            {backdrop_path ? (
                <img src={IMAGE_API + backdrop_path} alt={title} />
            ) : (
                <img src="no-cover.png" alt={title} />
            )}
            <div className="movie-info">
                <h3>{title}</h3>
                <span className={`tag ${setRatingClass(vote_average)}`}>{vote_average}</span>


            </div>
            <div className="movie-data">
                <h3 className="release">  {release_date}</h3>
                <span className={`tag ${setVoteClass(vote_count)}`}>Vote Count : {vote_count}</span>
            </div>

        </div>
    );
};

export default Movie;