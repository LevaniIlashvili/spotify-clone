import { useGlobalContext } from "../../context";
import styled from "styled-components";
import TrackHeart from "../TrackHeart";
import { Link } from "react-router-dom";

function TrackInfo() {
  const { currentTrack } = useGlobalContext();
  const { album, artists, name, external_urls } = currentTrack || {};
  const { images } = album || {};

  const { spotify: trackUrl } = external_urls || {};

  const image = images?.[2]?.url;

  return (
    <Wrapper className="track-info">
      <img src={`${image}`} alt="" />
      <div className="info">
        <Link to={`/track/${trackUrl}`} className="name">
          {name}
        </Link>
        <div>
          {artists?.map((artist, index) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}`}
              className="artist"
            >
              {artists.length === index + 1 ? artist.name : `${artist.name}, `}
            </Link>
          ))}
        </div>
      </div>
      {currentTrack && <TrackHeart track={currentTrack} />}
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
    color: var(--white);
  }

  .name {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--white);
    position: relative;
  }

  .artist {
    font-size: 1.1rem;
    color: var(--gray);
  }
`;

export default TrackInfo;
