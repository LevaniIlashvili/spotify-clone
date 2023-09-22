import { useState, useRef, useEffect } from "react";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import styled from "styled-components";
import { useGlobalContext } from "../../context";

function Features() {
  const { volume, isMuted, setVolume, setIsMuted } = useGlobalContext();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [volumeBeforeMuting, setVolumeBeforeMuting] = useState({
    volume,
    offsetX: null,
  });

  const volumeBar = useRef();
  const volumeThumb = useRef();

  useEffect(() => {
    setVolumeBeforeMuting({
      volume,
      offsetX: +getComputedStyle(volumeBar.current).width.replace(/px$/, ""),
    });
  }, []);

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
    setVolume(100 * change);
    setVolumeBeforeMuting({ volume: 100 * change, offsetX });
    volumeBar.current.style.right = `${barStyleWidth - offsetX}px`;
    volumeThumb.current.style.right = `${barStyleWidth - offsetX}px`;
  };

  const toggleMute = () => {
    const newVolume = volume === 0 ? volumeBeforeMuting : 0;
    setVolume(newVolume);
    changeVolume();
  };

  useEffect(() => {
    if (volumeBeforeMuting.offsetX === null) return;
    toggleMute();
  }, [isMuted]);

  return (
    <Wrapper className="features">
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
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .mic-icon {
    font-size: 1.6rem;
    cursor: pointer;
  }

  .queue-icon {
    font-size: 2rem;
    cursor: pointer;
  }

  .volume-icon {
    font-size: 2.5rem;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .progress-bar-container.volume-progress-bar-container {
    height: 1.2rem;
    min-width: 9.3rem;
  }

  .progress-bar.volume-progress-bar {
    min-width: 9.3rem;
  }

  .bar.volume-bar {
    min-width: 9.3rem;
    right: 0;
  }

  .thumb.volume-thumb {
    right: 0rem;
  }
`;

export default Features;
