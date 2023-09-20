import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { FiHeart } from "react-icons/fi";
import { LuShuffle } from "react-icons/lu";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { PiRepeatBold, PiRepeatOnceBold } from "react-icons/pi";
import { MdPauseCircle, MdPlayCircle } from "react-icons/md";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import axios from "axios";

function MusicPlayer() {
  const { currentTrack, userLikedSongs, accessToken } = useGlobalContext();
  const musicBar = useRef();
  const musicThumb = useRef();
  const volumeBar = useRef();
  const volumeThumb = useRef();
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repeatState, setRepeatState] = useState("none");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [volume, setVolume] = useState(100);
  const [volumeBeforeMuting, setVolumeBeforeMuting] = useState({
    volume,
    offsetX: null,
  });
  const [isMuted, setIsMuted] = useState(false);
  const { album, artists, name, external_urls, duration_ms } =
    currentTrack || {};
  const duration = duration_ms / 1000;
  const { images } = album || {};

  const { spotify: artistUrl } = artists?.[0]?.external_urls || {};
  const { spotify: trackUrl } = external_urls || {};

  const image = images?.[2]?.url;

  const likedSongsUris = userLikedSongs?.items?.map(
    (likedSong) => likedSong.track.uri
  );

  function formatTime(timestamp) {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    if (likedSongsUris?.includes(currentTrack.uri)) {
      setIsTrackLiked(true);
    }
  }, [userLikedSongs]);

  useEffect(() => {
    console.log(
      "yle",
      +getComputedStyle(volumeBar.current).width.replace(/px$/, "")
    );
    setVolumeBeforeMuting({
      volume,
      offsetX: +getComputedStyle(volumeBar.current).width.replace(/px$/, ""),
    });
  }, []);

  const clearAllIntervals = () => {
    for (let i = 1; i < 99999; i++) clearInterval(i);
  };

  useEffect(() => {
    // console.log(repeatState, progress, duration);
    if (repeatState === "song" && progress + 1 >= duration) {
      setProgress(0);
      clearAllIntervals();
      startPlaying();
      console.log("aioo");
    }
  }, [progress]);

  const toggleTrackLiked = async () => {
    setIsTrackLiked(!isTrackLiked);
    try {
      const response = await axios({
        method: isTrackLiked ? "delete" : "put",
        url: `https://api.spotify.com/v1/me/tracks?ids=${currentTrack.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { ids: [currentTrack.id] },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    clearAllIntervals();
  };

  const startPlaying = () => {
    setIsPlaying(true);
    const barStyleWidth = +getComputedStyle(musicBar.current).width.replace(
      /px$/,
      ""
    );
    const positionChange = barStyleWidth / duration;
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress <= duration) {
          musicBar.current.style.right = `${
            barStyleWidth - newProgress * positionChange
          }px`;
          musicThumb.current.style.right = `${
            barStyleWidth - newProgress * positionChange
          }px`;
          return newProgress;
        } else {
          clearInterval(interval);
          return prevProgress;
        }
      });
    }, 1000);
  };

  const changeTime = (e) => {
    const { offsetX } = e.nativeEvent;
    clearAllIntervals();
    const barStyleWidth = +getComputedStyle(musicBar.current).width.replace(
      /px$/,
      ""
    );
    const change = offsetX / barStyleWidth;
    setProgress(duration * change);
    musicBar.current.style.right = `${barStyleWidth - offsetX}px`;
    musicThumb.current.style.right = `${barStyleWidth - offsetX}px`;
  };

  const changeVolume = (e) => {
    const barStyleWidth = +getComputedStyle(volumeBar.current).width.replace(
      /px$/,
      ""
    );
    if (isMuted) {
      volumeBar.current.style.right = `${barStyleWidth}px`;
      volumeThumb.current.style.right = `${barStyleWidth}px`;
      return;
    }
    const offsetX = e ? e.nativeEvent.offsetX : volumeBeforeMuting.offsetX;
    const change = offsetX / barStyleWidth;
    console.log(100 * change);
    setVolume(100 * change);
    setVolumeBeforeMuting({ volume: 100 * change, offsetX });
    volumeBar.current.style.right = `${barStyleWidth - offsetX}px`;
    volumeThumb.current.style.right = `${barStyleWidth - offsetX}px`;
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? volumeBeforeMuting : 0;
    console.log(newVolume);
    setVolume(newVolume);
    changeVolume();
  };

  useEffect(() => {
    if (volumeBeforeMuting.offsetX === null) return;
    toggleMute();
  }, [isMuted]);
  console.log(volume);

  return (
    <Wrapper>
      <div className="track-info">
        <img src={`${image}`} alt="" />
        <div className="info">
          <a href={trackUrl} className="name">
            {name}
          </a>
          <a href={artistUrl} className="artist">
            {artists?.map((artist, index) =>
              artists.length === index + 1 ? artist.name : `${artist.name}, `
            )}
          </a>
        </div>
        <FiHeart
          onClick={toggleTrackLiked}
          className={`btn heart-icon ${isTrackLiked && "filled"}`}
        />
      </div>
      <div className="player">
        <div className="controls">
          <LuShuffle className="btn shuffle-icon" />
          <BiSkipPrevious className="btn previous-icon" />
          {isPlaying ? (
            <MdPauseCircle className="btn pause-icon" onClick={() => pause()} />
          ) : (
            <MdPlayCircle
              className="btn play-icon"
              onClick={() => startPlaying()}
            />
          )}
          <BiSkipNext className="btn next-icon" />
          <button
            style={{ background: "transparent", border: "none" }}
            onClick={() =>
              setRepeatState(() => {
                return repeatState === "none"
                  ? "playlist"
                  : repeatState === "playlist"
                  ? "song"
                  : "none";
              })
            }
          >
            {repeatState === "none" || repeatState === "playlist" ? (
              <PiRepeatBold
                className={`btn repeat-icon ${
                  repeatState === "playlist" && "active"
                }`}
              />
            ) : (
              <PiRepeatOnceBold className={`btn repeat-icon active`} />
            )}
          </button>
        </div>
        <div className="progress">
          <p className="track-progress">{formatTime(progress)}</p>
          <div
            className="progress-bar-container"
            onMouseDown={(e) => {
              changeTime(e);
              setIsMouseDown(true);
            }}
            onMouseUp={() => {
              startPlaying();
              setIsMouseDown(false);
            }}
            onMouseLeave={() => {
              isMouseDown && startPlaying();
              setIsMouseDown(false);
            }}
            onMouseMove={(e) => {
              isMouseDown && changeTime(e);
              isMouseDown && console.log("aa");
            }}
          >
            <div className="progress-bar">
              <div className="bar" ref={musicBar}></div>
            </div>
            <div className="thumb" ref={musicThumb}></div>
          </div>
          <p className="track-duration">{formatTime(duration)}</p>
        </div>
      </div>
      <div className="right-div">
        <LuMic2 className="btn mic-icon" />
        <HiOutlineQueueList className="btn queue-icon" />
        <div className="volume-control">
          {volume >= 60 ? (
            <FiVolume2
              className="btn volume-icon"
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            />
          ) : volume >= 20 ? (
            <FiVolume1
              className="btn volume-icon"
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            />
          ) : volume > 0 ? (
            <FiVolume
              className="btn volume-icon"
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            />
          ) : (
            <FiVolumeX
              className="btn volume-icon"
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            />
          )}
          <div
            className="progress-bar-container volume-progress-bar-container"
            onMouseDown={(e) => {
              changeVolume(e);
              setIsMouseDown(true);
            }}
            onMouseUp={() => {
              setIsMouseDown(false);
            }}
            onMouseLeave={() => {
              setIsMouseDown(false);
            }}
            onMouseMove={(e) => isMouseDown && changeVolume(e)}
          >
            <div className="progress-bar volume-progress-bar">
              <div className="bar volume-bar" ref={volumeBar}></div>
            </div>
            <div className="thumb volume-thumb" ref={volumeThumb}></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: #000;
  height: 8rem;
  width: 100%;
  position: absolute;
  top: calc(100vh - 8rem);
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;

  .track-info {
    min-width: 23rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  img {
    border-radius: 4px;
    width: 5.6rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    color: #fff;
  }

  .name {
    font-size: 1.25rem;
    font-weight: 500;
    color: #fff;
    position: relative;
  }

  /* .name:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    color: red;
    top: 0;
    right: 0;
    background: linear-gradient(to right, transparent 12.5em, #000000be);
    z-index: 1;
  } */

  /* .name {
    position: relative;
    animation: marquee 10s linear infinite alternate; 
  }

  @keyframes name {
    0%,
    100% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(-100%);
    }
  } */

  .artist {
    font-size: 1.1rem;
    color: #b3b3b3;
  }

  .btn {
    color: #b3b3b3;
  }

  .btn:hover {
    color: #fff;
  }

  .btn:active {
    color: #b3b3b3;
  }

  .active {
    color: #1ed760 !important;
  }

  .active:hover {
    color: #27fa71 !important;
  }

  .heart-icon {
    font-size: 1.8rem;
    min-width: 1.8rem;
    cursor: pointer;
  }

  .heart-icon.filled {
    color: #1ed760;
    fill: #1ed760;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 1.3rem;
  }

  .shuffle-icon {
    font-size: 1.8rem;
  }

  .previous-icon,
  .next-icon {
    font-size: 4rem;
  }

  .repeat-icon {
    font-size: 2.2rem;
  }

  .pause-icon,
  .play-icon {
    font-size: 4rem;
    color: #fff;
  }

  .pause-icon:active,
  .play-icon:active {
    transform: scale(0.95);
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    width: 100%;
  }

  .progress-bar-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
  }

  .progress-bar {
    background-color: hsla(0, 0%, 100%, 0.3);
    width: 100%;
    min-width: 20rem;
    flex-shrink: 1;
    height: 0.4rem;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
  }

  .bar {
    width: 100%;
    min-width: 20rem;
    height: 0.45rem;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
  }

  .thumb {
    width: 1.2rem;
    height: 1.2rem;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    display: none;
    margin-right: -0.6rem;
    pointer-events: none;
  }

  .progress-bar-container:hover .bar,
  .progress-bar-container.hovered .bar {
    background-color: #1ed760;
  }

  .progress-bar-container:hover .thumb,
  .progress-bar-container.hovered .thumb {
    display: block;
  }

  .track-progress,
  .track-duration {
    display: inline-block;
    color: #b3b3b3;
    font-size: 1.2rem;
  }

  .right-div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: 2rem;
  }

  .mic-icon {
    font-size: 1.6rem;
    cursor: pointer;
  }

  .queue-icon {
    font-size: 2rem;
    cursor: pointer;
  }

  .volume-icon {
    font-size: 2rem;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .volume-progress-bar-container {
    height: 1.2rem;
    width: 9.3rem;
  }

  .volume-progress-bar {
    width: 9.3rem;
  }

  .volume-bar {
    width: 9.3rem;
    right: 0;
  }

  .volume-thumb {
    right: 0rem;
  }
`;

export default MusicPlayer;
