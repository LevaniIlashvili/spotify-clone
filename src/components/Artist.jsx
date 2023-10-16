import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";

const Artist = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate(`/artist/${artist.id}`)} key={artist.id}>
      {artist.images[2]?.url ? (
        <img src={artist.images[2].url} alt="artist image" />
      ) : (
        <div className="stock-image">
          <AiOutlineUser className="stock-image-icon" />
        </div>
      )}
      <div>
        <h4>{artist.name}</h4>
        <p>Artist</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 2rem;
  padding-bottom: 3rem;
  border-radius: 7px;
  background-color: #161616;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #303030;
  }

  img {
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

  div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  div p {
    color: var(--gray);
    font-size: 1.5rem;
  }

  @media (max-width: 1980px) {
    &:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1700px) {
    &:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1430px) {
    &:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    &:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 940px) {
    &:nth-child(3) {
      display: none;
    }
  }
`;

export default Artist;
