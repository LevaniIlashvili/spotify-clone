import styled from "styled-components";
import Hero from "../components/Hero";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";
import LoadingScreen from "../components/LoadingScreen";
import { formatTimeMixed } from "../helpers";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import Track from "../components/Track";

const AlbumPage = ({ handleNavbarScroll }) => {
  const { id } = useParams();
  const {
    accessToken,
    isTrackPlaying,
    setIsTrackPlaying,
    currentTrack,
    setCurrentTrack,
    setQueue,
  } = useGlobalContext();
  const playBtnRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState(null);

  const getAlbum = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/albums/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setLoading(false);
      setAlbum(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAlbum();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <div
        className="container"
        onScroll={() => handleNavbarScroll(playBtnRef, album.name)}
      >
        <Hero
          img={album.images[1].url}
          type={album.type}
          name={album.name}
          userName={album.artists[0].name}
        >
          <span className="release-date">{album.release_date} •</span>
          <span className="album-length">
            {album.tracks.items.length} songs
          </span>
          <span className="playlist-duration">
            {formatTimeMixed(
              album.tracks.items.reduce((acc, track) => {
                if (track === null) return acc;
                return acc + track?.duration_ms;
              }, 0) / 1000
            )}
          </span>
        </Hero>
        <div className="main">
          <button
            ref={playBtnRef}
            type="button"
            className="start-playlist-btn animated-btn"
            onClick={() => {
              console.log(album.tracks.items);
              if (currentTrack?.playingFrom?.id !== album.id) {
                setQueue(album.tracks.items);
                setCurrentTrack({
                  ...album.tracks.items[0],
                  playingFrom: { type: "album", id: album.id },
                });
                setIsTrackPlaying(true);
              } else {
                setIsTrackPlaying(!isTrackPlaying);
              }
            }}
          >
            {isTrackPlaying && album.id === currentTrack?.playingFrom.id ? (
              <BsPauseFill className="play-icon" />
            ) : (
              <BsPlayFill className="play-icon" />
            )}
          </button>
          {album.tracks.items.map((track, index) => {
            return (
              <Track
                track={track}
                key={track.id}
                playingFrom={{ type: "album", id: album.id }}
                index={index + 1}
                queue={album.tracks.items}
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
  color: var(--white);
  grid-column: 2 / 3;

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

  .main {
    background: linear-gradient(transparent 0, black 50%), #313131;
    padding: 2rem;
  }

  .playlist-options-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 10rem;
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
    margin-bottom: 2rem;
  }

  .play-icon {
    font-size: 2.8rem;
  }
`;

export default AlbumPage;
