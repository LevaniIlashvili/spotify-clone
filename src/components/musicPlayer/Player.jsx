import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LuShuffle } from "react-icons/lu";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { PiRepeatBold, PiRepeatOnceBold } from "react-icons/pi";
import { MdPauseCircle, MdPlayCircle } from "react-icons/md";
import { useGlobalContext } from "../../context";

function Player() {
  const { currentTrack } = useGlobalContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [repeatState, setRepeatState] = useState("none");
  const musicBar = useRef();
  const musicThumb = useRef();
  const { duration_ms } = currentTrack || {};
  const duration = duration_ms / 1000;

  const clearAllIntervals = () => {
    for (let i = 1; i < 99999; i++) clearInterval(i);
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

  useEffect(() => {
    if (repeatState === "song" && progress + 1 >= duration) {
      setProgress(0);
      clearAllIntervals();
      startPlaying();
      console.log("aioo");
    }
  }, [progress]);

  function formatTime(timestamp) {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  }

  return (
    <Wrapper className="player">
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
    </Wrapper>
  );
}

const Wrapper = styled.section`
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

  .btn.pause-icon,
  .btn.play-icon {
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

  .track-progress,
  .track-duration {
    display: inline-block;
    color: #b3b3b3;
    font-size: 1.2rem;
  }
`;

export default Player;
