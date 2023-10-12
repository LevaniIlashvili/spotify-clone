import styled from "styled-components";
import { useGlobalContext } from "../context";
import { useState } from "react";

const YourPlaylists = () => {
  const [showAll, setShowAll] = useState(false);
  const { userPlaylists, user } = useGlobalContext();

  return (
    <Wrapper>
      <div className="top">
        <h2>Your playlists</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="your-playlists-container">
        {userPlaylists
          .filter((playlist) => playlist.owner.id === user.id)
          .slice(0, showAll ? 20 : 7)
          .map((playlist) => {
            console.log(playlist);
            return (
              <div className="playlist" key={playlist.id}>
                <img src={playlist.images[1].url} alt="playlist image" />
                <div>
                  <h4>{playlist.name}</h4>
                  <p>By {playlist.owner.display_name}</p>
                </div>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: var(--white);

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .top button {
    background: transparent;
    border: none;
    color: var(--gray);
  }

  .top button:hover {
    color: var(--white);
  }

  .your-playlists-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }

  @media (max-width: 2010px) {
    .playlist:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1725px) {
    .playlist:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    .playlist:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    .playlist:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 925px) {
    .playlist:nth-child(3) {
      display: none;
    }
  }

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
    border-radius: 5px;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .playlist div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .playlist div p {
    color: var(--gray);
    font-size: 1.5rem;
  }
`;

export default YourPlaylists;
