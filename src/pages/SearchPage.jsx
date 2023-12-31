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
  const [isLoading, setIsLoading] = useState(false);

  const getSearchResults = async (
    url = `https://api.spotify.com/v1/search?q=${searchQuery}&type=${selectedFilter}&limit=40`
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
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, do nothing
      } else {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    setSearchResults([]);
    setIsLoading(true);

    getSearchResults();
  }, [searchQuery, selectedFilter]);

  if (isLoading)
    return (
      <Wrapper className="wrapper-flex">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </Wrapper>
    );

  if (!searchQuery || searchResults?.length === 0)
    return (
      <Wrapper className="wrapper-flex">
        <h1>No search results</h1>
      </Wrapper>
    );

  return (
    <Wrapper>
      <div
        className="container"
        onScroll={(e) => {
          const bottom = bottomEl.current.getBoundingClientRect();
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

  &.wrapper-flex {
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      font-size: 3rem;
    }

    .dot {
      width: 0.8rem;
      height: 0.8rem;
      background-color: var(--white);
      border-radius: 50%;
      animation: bounce 0.4s infinite alternate;
    }

    .dot-1 {
      animation-delay: 0.1s;
    }

    .dot-2 {
      animation-delay: 0.2s;
    }

    .dot-3 {
      animation-delay: 0.3s;
    }

    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-0.8rem);
      }
    }
  }

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
