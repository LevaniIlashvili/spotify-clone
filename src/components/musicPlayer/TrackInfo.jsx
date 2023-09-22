import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { FiHeart } from "react-icons/fi";
import axios from "axios";
import styled from "styled-components";

function TrackInfo() {
  const { currentTrack, userLikedSongs, accessToken } = useGlobalContext();
  const [isTrackLiked, setIsTrackLiked] = useState(false);
  const { album, artists, name, external_urls } = currentTrack || {};
  const { images } = album || {};

  const { spotify: artistUrl } = artists?.[0]?.external_urls || {};
  const { spotify: trackUrl } = external_urls || {};

  const image = images?.[2]?.url;

  const likedSongsUris = userLikedSongs?.items?.map(
    (likedSong) => likedSong.track.uri
  );

  useEffect(() => {
    if (likedSongsUris?.includes(currentTrack.uri)) {
      setIsTrackLiked(true);
    }
  }, [userLikedSongs]);

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

  return (
    <Wrapper className="track-info">
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
    </Wrapper>
  );
}

const Wrapper = styled.section`
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

  .heart-icon {
    font-size: 1.8rem;
    min-width: 1.8rem;
    cursor: pointer;
  }

  .heart-icon.filled {
    color: #1ed760;
    fill: #1ed760;
  }
`;

export default TrackInfo;
