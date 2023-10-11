import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { formatTimeNumbers } from "../helpers";
import LoadingScreen from "./LoadingScreen";
import Hero from "./Hero";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import ArtistPopularTracks from "./ArtistPopularTracks";
import FansAlsoLike from "./FansAlsoLike";

const TrackPage = ({ handleNavbarScroll }) => {
  const { id } = useParams();
  const {
    accessToken,
    currentTrack,
    setCurrentTrack,
    isTrackPlaying,
    setIsTrackPlaying,
    setQueue,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [pageTrack, setPageTrack] = useState(null);
  const [artists, setArtists] = useState(null);
  const playBtnRef = useRef(null);

  const getPageTrack = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setPageTrack(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const artistIds = pageTrack?.artists.map((artist) => artist.id).join(",");

  const getArtists = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists?ids=${artistIds}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setArtists(response.data.artists);
    } catch (error) {
      console.log(error);
    }
  };

  const playPageTrack = () => {
    if (pageTrack.id !== currentTrack?.playingFrom.id) {
      setIsTrackPlaying(true);
      setCurrentTrack({
        ...pageTrack,
        playingFrom: { type: "trackPage", id: pageTrack.id },
      });
      setQueue([pageTrack]);
    } else if (
      pageTrack.id === currentTrack?.playingFrom.id &&
      !isTrackPlaying
    ) {
      setIsTrackPlaying(true);
    } else {
      setIsTrackPlaying(false);
    }
  };

  useEffect(() => {
    getPageTrack();
    getArtists();
  }, [artistIds, id]);

  if (!pageTrack || !artists) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <div
        className="container"
        onScroll={() => handleNavbarScroll(playBtnRef, pageTrack.name)}
      >
        <Hero
          img={pageTrack.album.images[0].url}
          type={pageTrack.type}
          name={pageTrack.name}
          userName={pageTrack.artists[0].name}
        >
          <a href="#" className="album-link">
            {pageTrack.album.name} •
          </a>
          <span>{new Date(pageTrack.album.release_date).getFullYear()} •</span>
          <span>{formatTimeNumbers(pageTrack.duration_ms / 1000)}</span>
        </Hero>
        <div className="main">
          <div className="playlist-options-container">
            <button
              ref={playBtnRef}
              type="button"
              className="start-playlist-btn animated-btn"
              onClick={playPageTrack}
            >
              {isTrackPlaying &&
              pageTrack.id === currentTrack?.playingFrom.id ? (
                <BsPauseFill className="play-icon" />
              ) : (
                <BsPlayFill className="play-icon" />
              )}
            </button>
          </div>
          {artists?.map((artist, index) => {
            console.log(artist);
            return (
              <div
                key={index}
                className="artist-container"
                onClick={() => navigate(`/artist/${artist?.id}`)}
              >
                <img src={artist?.images[2].url} alt="artist image" />{" "}
                <div>
                  <p>Artist</p>
                  <Link to={`/artist/${artist?.id}`}>{artist?.name}</Link>
                </div>
              </div>
            );
          })}
          {artists.map((artist, index) => {
            return <ArtistPopularTracks key={index} artist={artist} />;
          })}
          <FansAlsoLike artistId={artists[0]?.id} />
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

  .artist-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.7rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .artist-container:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  .artist-container img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }

  .artist-container div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--white);
  }

  .artist-container div p {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .artist-container div a {
    text-decoration: none;
    color: var(--white);
    font-weight: 700;
  }

  .artist-container div a:hover {
    text-decoration: underline;
  }
`;

export default TrackPage;
