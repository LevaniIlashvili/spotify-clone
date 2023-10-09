import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LuShuffle } from "react-icons/lu";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { PiRepeatBold, PiRepeatOnceBold } from "react-icons/pi";
import { MdPauseCircle, MdPlayCircle } from "react-icons/md";
import { useGlobalContext } from "../../context";
import { formatTimeNumbers } from "../../helpers";

const Player = () => {
  const {
    currentTrack,
    setCurrentTrack,
    isTrackPlaying,
    setIsTrackPlaying,
    queue,
  } = useGlobalContext();
  const [progress, setProgress] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [repeatState, setRepeatState] = useState("none");
  const musicBar = useRef();
  const musicThumb = useRef();
  const duration = currentTrack?.duration_ms / 1000;
  const currentTrackIndex = queue?.findIndex(
    (track) => track?.id === currentTrack?.id
  );

  const resetProgressBar = () => {
    const barStyleWidth = +getComputedStyle(musicBar.current).width.replace(
      /px$/,
      ""
    );
    musicBar.current.style.right = `${barStyleWidth}px`;
    musicThumb.current.style.right = `${barStyleWidth}px`;
  };

  useEffect(() => {
    resetProgressBar();
    setProgress(0);
  }, [currentTrack]);

  const clearAllIntervals = () => {
    for (let i = 1; i < 99999; i++) clearInterval(i);
  };

  useEffect(() => {
    if (isTrackPlaying) {
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
            if (repeatState === "song") {
              resetProgressBar();
              return 0;
            }
            setTimeout(() => {
              if (!queue[currentTrackIndex + 1]) {
                resetProgressBar();
                setIsTrackPlaying(false);
                return 0;
              }
              setCurrentTrack({
                ...currentTrack,
                ...queue[currentTrackIndex + 1],
              });
            }, 0);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      clearAllIntervals();
    }
  }, [isTrackPlaying, currentTrack, repeatState]);

  const changeTime = (e) => {
    const { offsetX } = e.nativeEvent;
    const barStyleWidth = +getComputedStyle(musicBar.current).width.replace(
      /px$/,
      ""
    );
    const change = offsetX / barStyleWidth;
    setProgress(duration * change);
    musicBar.current.style.right = `${barStyleWidth - offsetX}px`;
    musicThumb.current.style.right = `${barStyleWidth - offsetX}px`;
  };

  // useEffect(() => {
  //   if (repeatState === "song" && progress >= duration) {
  //     setProgress(0);
  //     // clearAllIntervals();
  //     setIsTrackPlaying(true);
  //     console.log("aioo");
  //   }
  // }, [progress]);

  const skipToNext = () => {
    if (currentTrackIndex + 1 === queue.length) {
      setCurrentTrack({ ...currentTrack, ...queue[0] });
      return;
    }
    const nextTrack = queue[currentTrackIndex + 1];
    setCurrentTrack({ ...currentTrack, ...nextTrack });
    setIsTrackPlaying(true);
  };

  const skipToPrevious = () => {
    if (currentTrackIndex - 1 < 0) {
      resetProgressBar();
      setProgress(0);
      return;
    }
    const previousTrack = queue[currentTrackIndex - 1];
    setCurrentTrack({ ...currentTrack, ...previousTrack });
    setIsTrackPlaying(true);
  };

  return (
    <Wrapper className="player">
      <div className="controls">
        <LuShuffle className="btn shuffle-icon" />
        <BiSkipPrevious
          className={`btn previous-icon ${!currentTrack ? "disabled" : ""}`}
          onClick={skipToPrevious}
        />
        {isTrackPlaying ? (
          <MdPauseCircle
            className={`btn pause-icon ${!currentTrack ? "disabled" : ""}`}
            onClick={() => setIsTrackPlaying(false)}
          />
        ) : (
          <MdPlayCircle
            className={`btn play-icon ${!currentTrack ? "disabled" : ""}`}
            onClick={() => setIsTrackPlaying(true)}
          />
        )}
        <BiSkipNext
          className={`btn next-icon ${!currentTrack ? "disabled" : ""}`}
          onClick={skipToNext}
        />
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
              } ${!currentTrack ? "disabled" : ""}`}
            />
          ) : (
            <PiRepeatOnceBold
              className={`btn repeat-icon active ${
                !currentTrack ? "disabled" : ""
              }`}
            />
          )}
        </button>
      </div>
      <div className={`progress ${!currentTrack ? "disabled" : ""}`}>
        <p className="track-progress">{formatTimeNumbers(progress)}</p>
        <div
          className="progress-bar-container"
          onMouseDown={(e) => {
            setIsTrackPlaying(false);
            changeTime(e);
            setIsMouseDown(true);
          }}
          onMouseUp={() => {
            setIsTrackPlaying(true);
            setIsMouseDown(false);
          }}
          onMouseLeave={() => {
            isMouseDown && setIsTrackPlaying(true);
            setIsMouseDown(false);
          }}
          onMouseMove={(e) => {
            isMouseDown && changeTime(e);
          }}
        >
          <div className="progress-bar">
            <div className="bar" ref={musicBar}></div>
          </div>
          <div className="thumb" ref={musicThumb}></div>
        </div>
        <p className="track-duration">{formatTimeNumbers(duration)}</p>
      </div>
    </Wrapper>
  );
};

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
    color: var(--white);
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
    color: var(--gray);
    font-size: 1.2rem;
  }

  .disabled,
  .btn.disabled {
    color: var(--gray);
    pointer-events: none;
  }
`;

export default Player;
