import styled from "styled-components";
import { formatTimeNumbers, formatDate } from "../helpers";
import { useEffect, useState } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import TrackHeart from "./TrackHeart";
import { useGlobalContext } from "../context";

const Track = ({ playlist, item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    playlistBeingPlayed,
    setPlaylistBeingPlayed,
    currentTrack,
    setCurrentTrack,
    setIsTrackPlaying,
    isTrackPlaying,
  } = useGlobalContext();

  const {
    track: {
      album: {
        images: [, , { url: albumImageUrl }],
        external_urls: { spotify: albumUrl },
        name: albumName,
      },
      name: trackName,
      explicit,
      artists: [
        {
          external_urls: { spotify: artistUrl },
          name: artistName,
        },
      ],
      duration_ms: trackDuration,
    },
    added_at,
  } = item;

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
                if (playlist.id !== playlistBeingPlayed.id) {
                  setPlaylistBeingPlayed(playlist);
                }
                setCurrentTrack(item.track);
              }}
            >
              {isTrackPlaying && item.track.id === currentTrack.id ? (
                <BsPauseFill onClick={() => setIsTrackPlaying(false)} />
              ) : (
                <BsPlayFill onClick={() => setIsTrackPlaying(true)} />
              )}
            </button>
          ) : (
            <span
              className={`track-index ${
                currentTrack?.id === item.track.id ? "currently-playing" : ""
              }`}
            >
              {index}
            </span>
          )}
        </span>
      </div>
      <div className="track-preview">
        <img
          src={albumImageUrl}
          alt="album image"
          className="track-album-img"
        />
        <div className="track-artist-names">
          <a
            href="#"
            className={`link track-link ${
              currentTrack?.id === item.track.id ? "currently-playing" : ""
            }`}
          >
            {trackName}
          </a>
          <div>
            {explicit && <span className="explicit">E</span>}
            <a href={artistUrl} className="link artist-link">
              {artistName}
            </a>
          </div>
        </div>
      </div>
      <div className="album-name">
        <a className="link album-link" href={albumUrl}>
          {albumName}
        </a>
      </div>
      <div className="date-added">
        <span>{formatDate(added_at)}</span>
      </div>
      <div className="is-track-liked-and-duration">
        <span>{isHovered && <TrackHeart track={item.track} />}</span>
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
