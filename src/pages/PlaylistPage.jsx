import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { formatTimeMixed } from "../helpers";
import Track from "../components/Track";
import { LuClock3 } from "react-icons/lu";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";

const PlaylistPage = ({ handleNavbarScroll }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState(null);
  const [isPlaylistFollowed, setIsPlaylistFollowed] = useState(false);
  const { id } = useParams();
  const playBtnRef = useRef(null);
  const {
    accessToken,
    setCurrentTrack,
    currentTrack,
    isTrackPlaying,
    setIsTrackPlaying,
    setQueue,
    user,
    userPlaylists,
    setUserPlaylists,
  } = useGlobalContext();

  console.log(currentPlaylist);

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

  const checkIfPlaylistIsFollowed = async () => {
    if (!id) return;
    if (user.id !== currentPlaylist?.owner.id) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}/followers/contains?ids=${user.id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setIsPlaylistFollowed(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const toggleFollow = async () => {
    setIsPlaylistFollowed(!isPlaylistFollowed);
    try {
      if (isPlaylistFollowed) {
        await axios.delete(
          `https://api.spotify.com/v1/playlists/${id}/followers`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const updatedPlaylists = userPlaylists.filter(
          (playlist) => playlist.id !== id
        );
        setUserPlaylists(updatedPlaylists);
      } else {
        await axios.put(
          `https://api.spotify.com/v1/playlists/${id}/followers`,
          {},
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setUserPlaylists([...userPlaylists, currentPlaylist]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylist();
    getPlaylistTracks();
    checkIfPlaylistIsFollowed();
  }, [id]);

  if (!currentPlaylist || !currentPlaylistTracks) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <Wrapper>
      <div
        className="main"
        onScroll={() => handleNavbarScroll(playBtnRef, currentPlaylist.name)}
      >
        <Hero
          img={
            currentPlaylist.images[currentPlaylist.images.length === 1 ? 0 : 1]
              ?.url
          }
          type={currentPlaylist.type}
          name={currentPlaylist.name}
          userName={currentPlaylist.owner.display_name}
        >
          <span>{` ${currentPlaylistTracks.length} songs,`}</span>
          <span className="playlist-duration">
            {formatTimeMixed(
              currentPlaylistTracks.reduce((acc, item) => {
                if (item.track === null) return acc;
                return acc + item.track?.duration_ms;
              }, 0) / 1000
            )}
          </span>
        </Hero>
        <div className="playlist-options-container">
          <button
            ref={playBtnRef}
            type="button"
            className="start-playlist-btn animated-btn"
            onClick={() => {
              if (currentTrack?.playingFrom?.id !== currentPlaylist.id) {
                setQueue(
                  currentPlaylist.tracks.items.map((item) => item.track)
                );
                setCurrentTrack({
                  ...currentPlaylist.tracks.items[0].track,
                  playingFrom: { type: "playlist", id: currentPlaylist.id },
                });
                setIsTrackPlaying(true);
              } else {
                setIsTrackPlaying(!isTrackPlaying);
              }
            }}
          >
            {isTrackPlaying &&
            currentTrack?.playingFrom?.id === currentPlaylist.id ? (
              <BsPauseFill className="play-icon" />
            ) : (
              <BsPlayFill className="play-icon" />
            )}
          </button>
          {currentPlaylist.owner.id !== user.id && (
            <button
              className="playlist-follow-btn animated-btn"
              onClick={toggleFollow}
            >
              <FiHeart
                className={`heart-icon ${isPlaylistFollowed ? "filled" : ""}`}
              />
            </button>
          )}
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
          {currentPlaylistTracks.map((item, index) => {
            if (item.track === null) return;
            return (
              <Track
                key={item.track.id}
                track={item.track}
                index={index + 1}
                playingFrom={{ type: "playlist", id: currentPlaylist.id }}
                queue={currentPlaylist.tracks.items.map((item) => item.track)}
                addedAt={item.added_at}
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
  height: calc(100vh - 11rem);
  padding: 0.8rem;
  grid-column: 2/ 3;

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

  .playlist-options-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 10rem;
    padding: 2rem;
    background: linear-gradient(transparent 0, black 1000000%), #313131;
  }

  .start-playlist-btn {
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

  .playlist-follow-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 3.5rem;
    color: var(--gray);
  }

  .playlist-follow-btn:hover {
    color: var(--white);
  }

  .playlist-follow-btn:active {
    color: var(--gray);
  }

  .heart-icon.filled {
    fill: var(--green);
    color: var(--green);
  }

  .tracks {
    width: 100%;
    background: linear-gradient(transparent 0, black 20%), #313131;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
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

export default PlaylistPage;
