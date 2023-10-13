import styled from "styled-components";
import { formatTimeNumbers, formatDate } from "../helpers";
import { useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import TrackHeart from "./TrackHeart";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Track = ({ playingFrom, track, index, addedAt, queue }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    currentTrack,
    setCurrentTrack,
    setIsTrackPlaying,
    isTrackPlaying,
    setQueue,
  } = useGlobalContext();

  const {
    name: trackName,
    album: {
      images: [, , { url: albumImageUrl = {} } = {}] = [],
      name: albumName,
      id: albumId,
    } = {},
    explicit,
    artists: [{ id: artistId, name: artistName }] = [],
    duration_ms: trackDuration,
  } = track;

  return (
    <Wrapper
      className="track"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="track-number">
        <span>
          {isHovered ? (
            <button
              className="play-btn"
              onClick={() => {
                if (
                  currentTrack?.id !== track.id ||
                  playingFrom.id !== currentTrack?.playingFrom?.id
                ) {
                  setCurrentTrack({ ...track, playingFrom });
                  setQueue(queue);
                }
              }}
            >
              {isTrackPlaying &&
              track.id === currentTrack?.id &&
              playingFrom.id === currentTrack?.playingFrom?.id ? (
                <BsPauseFill onClick={() => setIsTrackPlaying(false)} />
              ) : (
                <BsPlayFill onClick={() => setIsTrackPlaying(true)} />
              )}
            </button>
          ) : (
            <span
              className={`track-index ${
                track.id === currentTrack?.id &&
                playingFrom.id === currentTrack?.playingFrom?.id
                  ? "currently-playing"
                  : ""
              }`}
            >
              {index}
            </span>
          )}
        </span>
      </div>
      <div className="track-preview">
        {playingFrom.type !== "album" && (
          <img
            src={albumImageUrl}
            alt="album image"
            className="track-album-img"
          />
        )}
        <div className="track-artist-names">
          <Link
            to={`/track/${track?.id}`}
            className={`link track-link ${
              track.id === currentTrack?.id &&
              playingFrom.id === currentTrack?.playingFrom?.id
                ? "currently-playing"
                : ""
            }`}
          >
            {trackName}
          </Link>
          <div>
            {explicit && <span className="explicit">E</span>}
            <span className="artist-link-container">
              {(playingFrom.type === "playlist" ||
                playingFrom.type === "album") &&
                track.artists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    to={`/artist/${artist.id}`}
                    className="link artist-link"
                  >
                    {track.artists.length === index + 1
                      ? artist.name
                      : `${artist.name}, `}
                  </Link>
                ))}
            </span>
          </div>
        </div>
      </div>
      <div className="album-name">
        {playingFrom.type === "playlist" && (
          <Link to={`/album/${albumId}`} className="link album-link">
            {albumName}
          </Link>
        )}
      </div>
      <div className="date-added">
        {playingFrom.type === "playlist" && <span>{formatDate(addedAt)}</span>}
      </div>
      <div className="is-track-liked-and-duration">
        <span>{isHovered && <TrackHeart track={track} />}</span>
        <span className="duration">
          {formatTimeNumbers(trackDuration / 1000)}
        </span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.2fr 2fr 1.5fr 1fr 1fr;
  gap: 1rem;
  color: var(--gray);
  align-items: center;
  padding: 0.9rem 2rem;
  border-radius: 4px;
  height: 5.8rem;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  .play-btn {
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.9rem;
    color: var(--white);
  }

  .track-preview {
    display: flex;
    gap: 1.5rem;
    min-width: 0;
  }

  .track-album-img {
    width: 4rem;
    height: 4rem;
  }

  .track-artist-names {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  .track-artist-names div {
    /* width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }

  .artist-link-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .link {
    color: var(--gray);
    text-decoration: none;
  }

  .link:hover {
    text-decoration: underline;
    color: var(--white);
  }

  .track-link {
    font-size: 1.5rem;
    color: var(--white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .currently-playing {
    color: #1ed760;
  }

  .currently-playing:hover {
    color: #1ed760;
  }

  .artist-link {
    font-size: 1.35rem;
  }

  .track-artist-names div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .explicit {
    color: #121212;
    background-color: hsla(0, 0%, 100%, 0.6);
    font-size: 0.9rem;
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
  }

  .album-name {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .album-link {
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date-added {
    font-size: 1.4rem;
  }

  .heart-icon {
    font-size: 1.8rem;
    min-width: 1.8rem;
    cursor: pointer;
  }

  .is-track-liked-and-duration {
    height: 100%;
    font-size: 1.4rem;
    display: grid;
    align-items: center;
    grid-template-columns: 0.5fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 1070px) {
    grid-template-columns: 0.2fr 4fr 2fr 1.5fr;
    gap: 2rem;

    .date-added {
      display: none;
    }
  }

  @media (max-width: 840px) {
    grid-template-columns: 0.2fr 5fr 2fr;

    .album-name {
      display: none;
    }
  }
`;

export default Track;
