import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { formatTimeMixed } from "../helpers";
import Track from "./Track";
import { LuClock3 } from "react-icons/lu";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import LoadingScreen from "./LoadingScreen";

// let PLAYLIST_NAME_FONT_SIZE = 10;

const Playlist = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState(null);
  const { id } = useParams();
  const {
    accessToken,
    user,
    playlistBeingPlayed,
    setPlaylistBeingPlayed,
    setCurrentTrack,
    isTrackPlaying,
    setIsTrackPlaying,
  } = useGlobalContext();

  // if (currentPlaylist?.name?.length > 13) {
  //   console.log(currentPlaylist?.name?.length);
  //   PLAYLIST_NAME_FONT_SIZE = 6;
  // }

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCurrentPlaylist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylistTracks = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${id}/tracks`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCurrentPlaylistTracks(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // setPlaylistBeingPlayed(currentPlaylist);
  // const startPlayingPlaylist = () => {
  //   setCurrentTrack(currentPlaylist.tracks.items[0].track);
  //   // setTrackProgress(0);
  //   setIsTrackPlaying(true);
  //   console.log("start playing playlist");
  // };

  useEffect(() => {
    getPlaylist();
    getPlaylistTracks();
  }, [id]);

  // console.log(currentPlaylist);

  if (!currentPlaylist || !currentPlaylistTracks) {
    return <LoadingScreen></LoadingScreen>;
  }

  let index = 0;

  return (
    <Wrapper>
      <div className="main">
        <div className="theme">
          <div className="top">
            <div className="top-right-side">
              <button className="btn animated-btn explore-premium-btn">
                Explore Premium
              </button>
              <button className="btn animated-btn install-app-btn">
                Install App
              </button>
              <div className="user-img-container">
                <img
                  src={user.images[0].url}
                  alt="user image"
                  className="user-img"
                />
              </div>
            </div>
          </div>
          <div className="playlist-info">
            <img
              src={
                currentPlaylist.images[
                  currentPlaylist.images.length === 1 ? 0 : 1
                ]?.url
              }
              className="playlist-img"
            />
            <div className="playlist-info-text">
              <p className="type">{currentPlaylist.type}</p>
              <h1 className="playlist-name">{currentPlaylist.name}</h1>
              <div>
                <img
                  src={user.images[0].url}
                  alt="user image"
                  className="user-img"
                />
                <p className="user-name-and-tracks">{`${user.display_name} • ${currentPlaylistTracks.length} songs,`}</p>
                <p className="playlist-duration">
                  {formatTimeMixed(
                    currentPlaylistTracks.reduce((acc, item) => {
                      if (item.track === null) return acc;
                      return acc + item.track?.duration_ms;
                    }, 0) / 1000
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="playlist-options-container">
          <button
            type="button"
            className="start-playlist animated-btn"
            onClick={() => {
              setIsTrackPlaying(!isTrackPlaying);
              if (currentPlaylist.id !== playlistBeingPlayed.id) {
                setCurrentTrack(currentPlaylist.tracks.items[0].track);
                setPlaylistBeingPlayed(currentPlaylist);
              }
            }}
          >
            {isTrackPlaying && currentPlaylist.id === playlistBeingPlayed.id ? (
              <BsPauseFill className="play-icon" />
            ) : (
              <BsPlayFill className="play-icon" />
            )}
          </button>
        </div>
        <div className="tracks">
          <div className="tracks-top">
            <div className="track-number">#</div>
            <div className="track-title">Title</div>
            <div className="track-album-name">Album</div>
            <div className="track-date-added">Date added</div>
            <div className="track-duration">
              <LuClock3 className="clock-icon" />
            </div>
          </div>
          {currentPlaylistTracks.map((item) => {
            if (item.track === null) return;
            index++;
            return (
              <Track
                key={item.track.id}
                item={item}
                index={index}
                playlist={currentPlaylist}
              />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--black);
  height: calc(100vh - 5.5rem);
  padding: 0.8rem;

  .main {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .main::-webkit-scrollbar {
    width: 1.25rem;
  }

  .main::-webkit-scrollbar-track {
    background: transparent;
  }

  .main::-webkit-scrollbar-thumb {
    background: transparent;
    height: 1rem;
  }

  .main:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.35);
  }

  .main::-webkit-scrollbar-thumb:hover {
    background: hsla(0, 0%, 100%, 0.5);
  }

  .main::-webkit-scrollbar-thumb:active {
    background: hsla(0, 0%, 100%, 0.7);
  }

  .theme {
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%), #686767;
    width: 100%;
    height: 34rem;
    border-radius: 8px 8px 0 0;
    padding: 1.5rem 2rem;
  }

  .top {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4rem;
  }

  .top-right-side {
    display: flex;
    gap: 1rem;
  }

  .explore-premium-btn,
  .install-app-btn {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
  }

  .explore-premium-btn {
    color: var(--black);
    background-color: var(--white);
  }

  .install-app-btn {
    color: var(--white);
    background-color: var(--black);
  }

  .user-img-container {
    background-color: #0000008f;
    border-radius: 50%;
    height: 3.2rem;
    width: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-img {
    border-radius: 50%;
    width: 2.4rem;
    height: 2.4rem;
  }

  .playlist-info {
    display: flex;
    height: 75%;
    align-items: flex-end;
    gap: 2rem;
    color: #ffffff;
  }

  .playlist-img {
    width: 23.2rem;
    height: 23.2rem;
    box-shadow: #292929 1rem 1rem 6rem;
  }

  .playlist-info-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .type {
    font-size: 1.35rem;
  }

  .playlist-name {
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  /*
  @media screen and (max-width: 1150px) {
    .playlist-name {
      font-size: 7rem;
    }
  }
  
  @media screen and (max-width: 1000px) {
    .playlist-name {
      font-size: 4rem;
    }
  } */

  .playlist-info-text div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
  }

  .user-name-and-songs-count {
    font-weight: 600;
  }

  .playlist-duration {
    color: var(--gray);
  }

  .playlist-options-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 10rem;
    padding: 2rem;
    background: linear-gradient(transparent 0, black 1000000%), #313131;
  }

  .start-playlist {
    background-color: var(--green);
    height: 6rem;
    width: 6rem;
    padding: 0.8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
  }

  .play-icon {
    font-size: 2.8rem;
  }

  /* .heart-icon {} */

  .tracks {
    width: 100%;
    background: linear-gradient(transparent 0, black 20%), #313131;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    /* gap: 1.5rem; */
  }

  .tracks-top {
    display: grid;
    padding: 0.9rem 2rem;
    grid-template-columns: 0.2fr 2fr 1.5fr 1fr 1fr;
    gap: 1rem;
    color: var(--gray);
    font-size: 1.4rem;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    margin-bottom: 1.5rem;
  }

  .track-duration {
    margin-left: 6rem;
  }

  .clock-icon {
    font-size: 1.8rem;
  }

  @media (max-width: 1280px) {
    .playlist-img {
      width: 19.2rem;
      height: 19.2rem;
    }
  }

  @media (max-width: 1070px) {
    .tracks-top {
      grid-template-columns: 0.2fr 4fr 2fr 1.5fr;
      gap: 2rem;
    }

    .playlist-name {
      font-size: 4rem;
    }

    .track-date-added {
      display: none;
    }

    .track-duration {
      margin-left: 5rem;
    }
  }

  @media (max-width: 840px) {
    .tracks-top {
      grid-template-columns: 0.2fr 5fr 2fr;
    }

    .playlist-name {
      font-size: 3rem;
    }

    .track-album-name {
      display: none;
    }
  }
`;

export default Playlist;
