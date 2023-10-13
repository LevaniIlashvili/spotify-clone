import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { VscLibrary } from "react-icons/vsc";
import { BsPlusLg } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";
import SortDropdown from "./SortDropdown";

const Sidebar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    filteredPlaylists,
    playlistFilterText,
    setPlaylistFilterText,
    isSidebarOpen,
    setIsSidebarOpen,
    currentTrack,
  } = useGlobalContext();

  const location = useLocation();
  console.log(location.pathname.split("/")[1], location.pathname.split("/")[2]);

  const handleClickOutside = (e) => {
    if (
      playlistFilterText === "" &&
      !e.target.classList.contains("playlist-search-input") &&
      !e.target.classList.contains("playlist-search-btn") &&
      !e.target.classList.contains("playlist-clear-btn")
    ) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [playlistFilterText]);

  if (!isSidebarOpen) {
    return (
      <Wrapper2>
        <Link to="/">
          <GoHomeFill className="home-icon" />
        </Link>
        <Link to="/">
          <FiSearch className="search-icon" />
        </Link>
        <VscLibrary
          className="library-icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <ul className="library">
          {filteredPlaylists.map((playlist) => {
            console.log(playlist);
            return (
              <li key={playlist.id} className="playlist">
                <Link to={`playlist/${playlist.id}`}>
                  {playlist.images[0]?.url ? (
                    <img src={playlist.images[0].url} />
                  ) : (
                    <div className="stock-img">
                      <BsMusicNoteBeamed />
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Wrapper2>
    );
  }

  return (
    <Wrapper>
      <Link
        to="/"
        className={`link home-link ${
          location.pathname === "/" ? "selected" : ""
        }`}
      >
        <GoHomeFill className="home-icon" />
        <p>Home</p>
      </Link>
      <Link className="link search-link">
        <button className="search-btn">
          <FiSearch />
        </button>
        <p>Search</p>
      </Link>
      <div className="your-library">
        <button
          className="btn link library-link"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <VscLibrary className="library-icon" />
          <p>Your Library</p>
        </button>
        <button className="btn plus-icon">
          <BsPlusLg />
        </button>
      </div>
      <ul className="library">
        <li className="filter-container">
          <div className="search-container">
            <button
              className="btn search-btn playlist-search-btn"
              onClick={() => setIsSearchOpen(true)}
            >
              <FiSearch />
            </button>
            <input
              placeholder="Search in Your Library"
              type="search"
              className={`playlist-search-input ${
                !isSearchOpen ? "hidden" : ""
              }`}
              onChange={({ target }) => setPlaylistFilterText(target.value)}
              value={playlistFilterText}
            />
            <MdClear
              className={`playlist-clear-btn ${!isSearchOpen ? "hidden" : ""}`}
              onClick={() => setPlaylistFilterText("")}
            />
          </div>
          <SortDropdown />
        </li>
        {filteredPlaylists.map((playlist) => {
          return (
            <li key={playlist.id}>
              <Link
                to={`/playlist/${playlist.id}`}
                className={`playlist ${
                  location.pathname.split("/")[1] === "playlist" &&
                  location.pathname.split("/")[2] === playlist.id
                    ? "selected"
                    : ""
                }`}
              >
                {playlist.images[0]?.url ? (
                  <img src={playlist.images[0].url} className="playlist-img" />
                ) : (
                  <div className="stock-img">
                    <BsMusicNoteBeamed />
                  </div>
                )}
                <div>
                  <p
                    className={`name ${
                      currentTrack?.playingFrom.type === "playlist" &&
                      currentTrack?.playingFrom.id === playlist.id
                        ? "currently-playing"
                        : ""
                    }`}
                  >
                    {playlist.name}
                  </p>
                  <p className="type-owner">
                    {playlist.type.charAt(0).toUpperCase() +
                      playlist.type.slice(1)}{" "}
                    • {playlist.owner.display_name}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

const stockImgStyles = css`
  width: 4.8rem;
  height: 4.8rem;
  font-size: 2.5rem;
  background-color: #282828;
  color: var(--gray);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const scrollbarStyles = css`
  .library::-webkit-scrollbar {
    width: 1.25rem;
  }

  .library::-webkit-scrollbar-track {
    background: transparent;
  }

  .library::-webkit-scrollbar-thumb {
    background: transparent;
    height: 1rem;
  }

  .library:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.35);
  }

  .library::-webkit-scrollbar-thumb:hover {
    background: hsla(0, 0%, 100%, 0.5);
  }

  .library::-webkit-scrollbar-thumb:active {
    background: hsla(0, 0%, 100%, 0.7);
  }
`;

const Wrapper = styled.section`
  min-height: calc(100vh - 8rem);
  min-width: 31.5rem;
  background-color: var(--black);
  display: flex;
  flex-direction: column;
  padding: 2.5rem 0 0 2.5rem;
  overflow: normal;
  grid-column: 1 /2;
  grid-row: 1/ 3;

  .currently-playing {
    color: var(--green);
  }

  a {
    text-decoration: none;
  }

  .link {
    display: flex;
    color: var(--white);
    align-items: center;
    gap: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }

  .home-icon {
    font-size: 2.8rem;
  }

  .home-link {
    color: var(--gray);
  }

  .home-link:hover,
  .home-link.selected {
    color: var(--white);
  }

  .search-link {
    color: var(--dark-gray);
    margin-bottom: 4.5rem;
  }

  .search-btn {
    font-size: 2.5rem;
    background: transparent;
    border: none;
    color: var(--gray);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .search-btn:hover {
    background-color: #1a1a1a;
  }

  .search-link:hover,
  .search-link:hover .search-btn {
    color: var(--white);
  }

  .your-library {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin-bottom: 2rem;
  }

  .your-library div {
    gap: 1.5rem;
  }

  .library-link {
    background: transparent;
    border: none;
    color: var(--dark-gray);
    gap: 1.5rem;
    margin-bottom: 0;
    cursor: pointer;
  }

  .library-link:hover {
    color: var(--white);
  }

  .library-icon {
    font-size: 2.5rem;
  }

  .plus-icon,
  .next-icon {
    font-size: 2rem;
    cursor: pointer;
    background: none;
    border: none;
    height: 3rem;
    padding: 0.5rem;
  }

  .plus-icon:hover,
  .next-icon:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
    border-radius: 50%;
  }

  .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    min-height: 5.5rem;
  }

  .playlist-search-btn {
    cursor: pointer;
    font-size: 2rem;
    border-radius: 50%;
  }

  .playlist-search-btn:hover {
    color: var(--white);
  }

  .search-container {
    width: 23rem;
    display: flex;
    align-items: center;
    border-radius: 3px;
  }

  .playlist-search-input {
    box-sizing: border-box;
    width: 18.8rem;
    opacity: 1;
    border: none;
    outline: none;
    caret-color: var(--gray);
    color: var(--gray);
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #ffffff26;
    padding: 0.9rem 3rem;
    transition: all ease-in-out 0.6s;
    border-radius: 4px;
    transform: translateX(-2.5rem);
  }

  .playlist-clear-btn {
    color: var(--gray);
    font-size: 2.3rem;
    opacity: 1;
    transition: all ease-in-out 0.6s;
    transform: translateX(-5rem);
  }

  .playlist-search-input.hidden {
    width: 0;
    padding: 0;
    opacity: 0;
    transition: all ease-in-out 0.6s;
  }

  .playlist-clear-btn.hidden {
    width: 0;
    transition: all ease-in-out 0.6s;
  }

  .filter-container input::-webkit-search-cancel-button {
    display: none;
  }

  .sort-library {
    background-color: var(--black);
  }

  .library {
    height: calc(100vh - 25rem);
    display: flex;
    flex-direction: column;
    margin-left: -1rem;
    overflow: scroll;
  }

  ${scrollbarStyles}

  .playlist {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    color: var(--white);
    cursor: pointer;
    border-radius: 4px;
  }

  .playlist:hover,
  .playlist.selected {
    background-color: #292929;
  }

  .playlist.selected:hover {
    background-color: #3a3a3a;
  }

  .name {
    font-size: 1.5rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .type-owner {
    color: var(--dark-gray);
    font-size: 1.35rem;
    font-weight: 400;
  }

  .playlist div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  img {
    width: 4.8rem;
    border-radius: 4px;
  }

  .stock-img {
    ${stockImgStyles}
  }
`;

const Wrapper2 = styled.section`
  min-height: calc(100vh - 6rem);
  background-color: var(--black);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;

  .home-icon {
    color: var(--white);
    font-size: 2.8rem;
    margin-bottom: 2.5rem;
  }

  .search-icon {
    color: var(--gray);
    font-size: 2.5rem;
    margin-bottom: 4rem;
    cursor: pointer;
  }

  .search-icon:hover {
    color: var(--white);
  }

  .library-icon {
    color: var(--gray);
    font-size: 2.5rem;
    margin-bottom: 2rem;
    cursor: pointer;
  }

  .library-icon:hover {
    color: var(--white);
  }

  .library {
    height: calc(100vh - 26rem);
    display: flex;
    flex-direction: column;
    overflow: scroll;
    width: 6.5rem;
    margin-left: 1.5rem;
    gap: 1rem;
  }

  ${scrollbarStyles}

  img {
    width: 4.8rem;
    border-radius: 4px;
  }

  .stock-img {
    ${stockImgStyles}
  }
`;

export default Sidebar;
