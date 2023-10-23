import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useGlobalContext } from "../context";
import styled from "styled-components";

const TrackHeart = ({ track }) => {
  const { toggleTrackLiked, checkIsTrackLiked } = useGlobalContext();
  const [isTrackLiked, setIsTrackLiked] = useState(() =>
    checkIsTrackLiked(track)
  );

  useEffect(() => {
    setIsTrackLiked(() => checkIsTrackLiked(track));
  }, [track]);

  return (
    <Wrapper
      onClick={() => {
        setIsTrackLiked(!isTrackLiked);
        toggleTrackLiked(track, isTrackLiked);
      }}
    >
      <FiHeart className={`btn heart-icon ${isTrackLiked && "filled"}`} />
    </Wrapper>
  );
};

const Wrapper = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  .heart-icon {
    font-size: 1.8rem;
    min-width: 1.8rem;
    cursor: pointer;
  }

  .heart-icon.filled {
    color: var(--green);
    fill: var(--green);
  }
`;

export default TrackHeart;
