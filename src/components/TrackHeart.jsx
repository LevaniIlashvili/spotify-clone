import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useGlobalContext } from "../context";
import axios from "axios";
import styled from "styled-components";

const TrackHeart = ({ track }) => {
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const { userLikedSongs, accessToken } = useGlobalContext();

  const likedSongsUris = userLikedSongs?.items?.map(
    (likedSong) => likedSong.track?.uri
  );

  const toggleTrackLiked = async () => {
    setIsTrackLiked(!isTrackLiked);
    try {
      await axios({
        method: isTrackLiked ? "delete" : "put",
        url: `https://api.spotify.com/v1/me/tracks?ids=${track.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { ids: [track.id] },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (likedSongsUris?.includes(track?.uri)) {
      setIsTrackLiked(true);
    } else {
      setIsTrackLiked(false);
    }
  }, [userLikedSongs, track]);

  return (
    <Wrapper onClick={toggleTrackLiked}>
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
