import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  function doesContain(movieObj) {
    if (!watchlist) return false; 
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="relative w-full h-72 rounded-lg overflow-hidden shadow-md flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer object-cover bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="m-4 flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60"
        >
          <p className="text-white font-bold">❌</p>
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60"
        >
          <p className="text-white font-bold">🔖</p>
        </div>
      )}

      <div className="absolute bottom-0 w-full bg-black/70 text-white text-sm font-medium text-center py-2 px-1 truncate">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
