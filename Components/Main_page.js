import React, { useEffect, useState } from "react";
import Like from "../images/like.svg";
import GoTo from "../images/goTo.svg";
import "./Main_page.css";

const Main_page = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, [pageNum, searchQuery]);

  const getData = async () => {
    let url = `https://api.jikan.moe/v4/characters?page=${pageNum}&limit=15&q=${searchQuery}&order_by=favorites&sort=desc`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      let animeData =
        json.data.length > 0
          ? json.data.map((el) => {
              return {
                name: el.name,
                nicknames: el.nicknames,
                img: el.images.jpg.image_url,
                fav: el.favorites,
                url: el.url,
              };
            })
          : [];
      setData(animeData);
      setHasNext(json.pagination.has_next_page);
    } catch (e) {
      console.log(e);
      setData([]);
    }
  };

  return (
    <>
      <header>
        <h1>Search Anime Characters</h1>
        <input
          type="text"
          placeholder="Your Character"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <main className="animes">
        {data.map((el) => {
          return (
            <div className="card" key={el.name}>
              <img src={el.img} alt={el.name} className="animeImg" />
              <div className="cardName">
                <h2>{el.name}</h2>
                {el.nicknames.map((el2) => (
                  <span key={el2} className="nick">{el2}</span>
                ))}
              </div>
              <div>
                <img src={Like} alt="like" className="like" />
                <span>{el.fav}</span>
              </div>
              <a href={el.url} target="_blank" rel="noopener noreferrer">
                <img src={GoTo} alt="goto" className="goto" />
              </a>
            </div>
          );
        })}
        <div className="container d-flex justify-content-between my-4">
          {pageNum > 1 && (
            <button
              type="button"
              className="dark"
              onClick={() => setPageNum(pageNum - 1)}
            >
              &larr; Back
            </button>
          )}
          {hasNext && (
            <button
              type="button"
              className="dark"
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next &rarr;
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Main_page;
