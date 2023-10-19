import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Playlists = ({ playlists, display }) => {
  const navigate = useNavigate();

  return (
    <Wrapper className={display}>
      {playlists.map((playlist) => {
        return (
          <div
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            key={playlist.id}
            className="playlist"
          >
            <img src={playlist.images[0].url} alt="playlist image" />
            <div>
              <h4>{playlist.name}</h4>
              <p>Playlist</p>
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

  .playlist {
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

  .playlist:hover {
    background-color: #303030;
  }

  .playlist img {
    width: 18rem;
    height: 18rem;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .playlist div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .playlist div h4 {
    width: calc(100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .playlist div p {
    color: var(--gray);
    font-size: 1.5rem;
  }

  @media (max-width: 1980px) {
    &.limited .playlist:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1700px) {
    &.limited .playlist:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1430px) {
    &.limited .playlist:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    &.limited .playlist:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 940px) {
    &.limited .playlist:nth-child(3) {
      display: none;
    }
  }

  /* @media (max-width: 940px) {
    &.limited .playlist:nth-child(3) {
      display: none;
    }
  } */
`;

export default Playlists;
