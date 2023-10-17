import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Artists = ({ artists, display }) => {
  const navigate = useNavigate();

  return (
    <Wrapper className={display}>
      {artists.map((artist) => {
        return (
          <div
            className="artist"
            onClick={() => navigate(`/artist/${artist.id}`)}
            key={artist.id}
          >
            {artist.images[2]?.url ? (
              <img
                src={artist.images[2].url}
                alt="artist image"
                className="artist-image"
              />
            ) : (
              <div className="stock-image">
                <AiOutlineUser className="stock-image-icon" />
              </div>
            )}
            <div className="text-container">
              <h4>{artist.name}</h4>
              <p>Artist</p>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 2rem;

  .artist {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 2rem;
    padding-bottom: 3rem;
    border-radius: 7px;
    background-color: #161616;
    transition: all 0.2s ease-out;
  }

  .artist:hover {
    background-color: #303030;
  }

  .artist-image {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .stock-image {
    background-color: #474747;
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stock-image-icon {
    color: var(--gray);
    font-size: 7rem;
  }

  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .text-container h4 {
    width: calc(100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .text-container p {
    color: var(--gray);
    font-size: 1.5rem;
  }

  @media (max-width: 1980px) {
    &.limited .artist:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1700px) {
    &.limited .artist:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1430px) {
    &.limited .artist:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    &.limited .artist:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 940px) {
    &.limited .artist:nth-child(3) {
      display: none;
    }
  }
`;

export default Artists;
