import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import LoadingScreen from "../components/LoadingScreen";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import ArtistPopularTracks from "../components/ArtistPopularTracks";
import FansAlsoLike from "../components/FansAlsoLike";
import ErrorPage from "./ErrorPage";

const ArtistPage = () => {
  const {
    accessToken,
    isTrackPlaying,
    setIsTrackPlaying,
    currentTrack,
    setCurrentTrack,
    setQueue,
    checkIfFollowingArtist,
    toggleArtistFollow,
    handleNavbarScroll,
  } = useGlobalContext();
  const { id } = useParams();
  const playBtnRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [artistPopularTracks, setArtistPopularTracks] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const getArtist = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setArtist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getArtistPopularTracks = async () => {
    try {
      const response = await axios.get(
        `
        https://api.spotify.com/v1/artists/${id}/top-tracks?country=GE
        `,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setArtistPopularTracks(response.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFollow = async () => {
    const response = await checkIfFollowingArtist(artist?.id);
    setIsFollowing(response);
  };

  useEffect(() => {
    setLoading(true);

    const promises = [getArtist(), getArtistPopularTracks(), checkFollow()];

    Promise.all(promises)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    const container = document.querySelector(".container");
    if (container) {
      container.scrollTop = 0;
    }
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!loading && !artist) {
    return <ErrorPage />;
  }

  return (
    <Wrapper>
      <div
        className="container"
        onScroll={() => handleNavbarScroll(playBtnRef, artist.name)}
      >
        <div className="artist-hero">
          <img
            className="artist-image"
            src={artist.images[1].url}
            alt="artist image"
          />
          <div>
            <h1>{artist.name}</h1>
            <span className="artist-followers">
              {artist.followers.total.toLocaleString("en-US", {
                style: "decimal",
                maximumFractionDigits: 2,
              })}{" "}
              followers
            </span>
          </div>
        </div>
        <div className="main">
          <div className="playlist-options-container">
            <button
              ref={playBtnRef}
              type="button"
              className="start-playlist-btn animated-btn"
              onClick={() => {
                if (artist.id !== currentTrack?.playingFrom.id) {
                  setIsTrackPlaying(true);
                  setCurrentTrack({
                    ...artistPopularTracks[0],
                    playingFrom: { type: "artistPage", id: artist.id },
                  });
                  setQueue(artistPopularTracks);
                } else if (
                  artist.id === currentTrack?.playingFrom.id &&
                  !isTrackPlaying
                ) {
                  setIsTrackPlaying(true);
                } else {
                  setIsTrackPlaying(false);
                }
              }}
            >
              {isTrackPlaying && artist.id === currentTrack?.playingFrom.id ? (
                <BsPauseFill className="play-icon" />
              ) : (
                <BsPlayFill className="play-icon" />
              )}
            </button>
            <button
              className="follow-btn animated-btn"
              onClick={() => {
                toggleArtistFollow(artist.id, isFollowing);
                setIsFollowing(!isFollowing);
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
          <ArtistPopularTracks artist={artist} renderedIn="artistPage" />
          <FansAlsoLike artistId={artist.id} />
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

  .artist-hero {
    width: 100%;
    height: 30rem;
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%), #686767;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-left: 2rem;
  }

  .artist-image {
    width: 19rem;
    height: 19rem;
    border-radius: 50%;
    box-shadow: 0 0 5rem #333333;
  }

  @media (min-width: 1250px) {
    .artist-image {
      width: 23rem;
      height: 23rem;
    }
  }

  h1 {
    font-size: 5vw;
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
  }

  .play-icon {
    font-size: 2.8rem;
  }

  .follow-btn {
    background: transparent;
    color: var(--white);
    padding: 0.7rem 1.5rem;
    font-weight: 700;
    border-radius: 15px;
    border: 1px solid var(--gray);
    cursor: pointer;
  }

  .follow-btn:hover {
    border-color: var(--white);
  }

  .follow-btn:active {
    color: var(--gray);
    border-color: var(--gray);
  }
`;

export default ArtistPage;
