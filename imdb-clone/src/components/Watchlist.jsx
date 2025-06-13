import React from "react";
import { useState, useEffect } from "react";
import genreids from "../Utility/genre";

function Watchlist({ watchlist, setWatchlist , handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genrelist, setGenrelist] = useState(["All Genre"]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrentGenre(genre);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedIncreasing]);
  };

  let sortdecreasing = () => {
    let sorteddecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sorteddecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenrelist(["All Genre", ...temp]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genrelist.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currentGenre == genre
                  ? "bg-blue-400 mx-4 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold text-center items-center"
                  : "bg-gray-400 mx-4 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold text-center items-center"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4 ">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 rounded-xl"
          placeholder="Search Movies"
        />
      </div>
      <div className="overflow-hidden rounded border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center items-center">
                <div onClick={sortdecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
                <div>Ratings</div>
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movirObj)=>{
                if(currentGenre == "All Genre") {
                  return true;
                }else{
                  return genreids[movirObj.genre_ids[0] ]== currentGenre;
            }
          }).filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[7rem] w-[5rem] bg-cover bg-center"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={() => handleRemoveFromWatchlist(movieObj)} className="text-red-800">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
