import styled from "styled-components";
import TrackInfo from "./TrackInfo";
import Player from "./Player";
import Features from "./Features";

function MusicPlayer() {
  return (
    <Wrapper>
      <TrackInfo />
      <Player />
      <Features />
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

  .active {
    color: var(--green) !important;
  }

  .active:hover {
    color: #27fa71 !important;
  }

  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
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

  .features {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: 2rem;
  }
`;

export default MusicPlayer;
