import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { useEffect, useRef, useState } from "react";
import Track from "../components/Track";
import Artists from "../components/Artists";
import Playlists from "../components/Playlists";
import Albums from "../components/Albums";

const SearchPage = () => {
  const { searchQuery } = useParams();
  const { accessToken } = useGlobalContext();
  const [searchResults, setSearchResults] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("track");
  const bottomEl = useRef();
  const cancelToken = useRef();

  const getSearchResults = async (
    url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${selectedFilter}`
  ) => {
    if (cancelToken.current) {
      cancelToken.current.cancel("canceled");
    }

    cancelToken.current = axios.CancelToken.source();

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cancelToken: cancelToken.current.token,
      });
      setNextUrl(response.data[selectedFilter + "s"].next);
      setSearchResults((prev) => [
        ...prev,
        ...response.data[selectedFilter + "s"].items,
      ]);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, do nothing
      } else {
        console.log(error);
      }
    }
  };

  console.log(searchResults);

  useEffect(() => {
    if (!searchQuery) return;

    setSearchResults([]);

    getSearchResults();
  }, [searchQuery, selectedFilter]);

  if (!searchQuery) return <Wrapper></Wrapper>;

  return (
    <Wrapper>
      <div
        className="container"
        onScroll={(e) => {
          const bottom = bottomEl.current.getBoundingClientRect();
          console.log(bottom.y, e.target.offsetHeight);
          if (bottom.y < e.target.offsetHeight + 300) {
            getSearchResults(nextUrl);
          }
        }}
      >
        <div className="filter-container">
          <input
            type="radio"
            name="filter"
            id="Songs"
            value="track"
            checked={selectedFilter === "track"}
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <label htmlFor="Songs">Songs</label>

          <input
            type="radio"
            name="filter"
            id="Playlists"
            value="playlist"
            checked={selectedFilter === "playlist"}
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <label htmlFor="Playlists">Playlists</label>

          <input
            type="radio"
            name="filter"
            id="Artists"
            value="artist"
            checked={selectedFilter === "artist"}
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <label htmlFor="Artists">Artists</label>

          <input
            type="radio"
            name="filter"
            id="Albums"
            value="album"
            checked={selectedFilter === "album"}
            onChange={(e) => setSelectedFilter(e.target.value)}
          />
          <label htmlFor="Albums">Albums</label>
        </div>
        <div className="main-content">
          {selectedFilter === "artist" &&
          searchResults[0]?.type === "artist" ? (
            <Artists artists={searchResults} />
          ) : selectedFilter === "playlist" &&
            searchResults[0]?.type === "playlist" ? (
            <Playlists playlists={searchResults} />
          ) : selectedFilter === "album" &&
            searchResults[0]?.type === "album" ? (
            <Albums albums={searchResults} />
          ) : (
            searchResults?.map((item, index) => {
              return (
                item.type === "track" && (
                  <Track
                    track={item}
                    playingFrom={{ type: "search" }}
                    index={index + 1}
                    queue={[item]}
                    key={item.id}
                  />
                )
              );
            })
          )}
        </div>
        <span ref={bottomEl}></span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--black);
  height: calc(100vh - 11.5rem);
  padding: 1rem 2rem;
  color: var(--white);
  grid-column: 2/ 3;

  .container {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .container::-webkit-scrollbar {
    width: 1.25rem;
  }

  .container::-webkit-scrollbar-track {
    background: transparent;
  }

  .container::-webkit-scrollbar-thumb {
    background: transparent;
    height: 1rem;
  }

  .container:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.35);
  }

  .container::-webkit-scrollbar-thumb:hover {
    background: hsla(0, 0%, 100%, 0.5);
  }

  .container::-webkit-scrollbar-thumb:active {
    background: hsla(0, 0%, 100%, 0.7);
  }

  .filter-container {
    display: flex;
    gap: 1rem;
  }

  input[type="radio"] {
    display: none;
  }

  .filter-container label {
    background-color: #ffffff2b;
    padding: 0.8rem 1.2rem;
    border-radius: 2rem;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .filter-container input[type="radio"]:checked + label {
    background-color: var(--white);
    color: var(--black);
  }
`;

export default SearchPage;
