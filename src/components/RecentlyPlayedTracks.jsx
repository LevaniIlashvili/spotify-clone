import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const RecentlyPlayedTracks = () => {
  const { accessToken } = useGlobalContext();
  const [showAll, setShowAll] = useState(false);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState(null);

  const getRecentlyPlayedTracks = async () => {
    try {
      const response = await axios.get(
        `
      https://api.spotify.com/v1/me/player/recently-played`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setRecentlyPlayedTracks(response.data.items);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentlyPlayedTracks();
  }, []);

  console.log(recentlyPlayedTracks);
  if (!recentlyPlayedTracks) return;

  return (
    <Wrapper>
      <div className="top">
        <h2>Recently played tracks</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="recently-played-tracks-container">
        {recentlyPlayedTracks
          .filter((track, index, self) => {
            return (
              self.findIndex((t) => t.track.id === track.track.id) === index
            );
          })
          .slice(0, showAll ? 20 : 7)
          .map(({ track }) => {
            console.log(track);
            return (
              <div className="track" key={track.id}>
                <img src={track.album.images[1].url} alt="track image" />
                <div>
                  <h4>{track.name}</h4>
                  <p>{track.artists[0].name}</p>
                </div>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-right: 0.5rem;
  }

  .top button {
    background: transparent;
    border: none;
    color: var(--gray);
  }

  .top button:hover {
    color: var(--white);
  }

  .recently-played-tracks-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }

  @media (max-width: 2010px) {
    .track:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1725px) {
    .track:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    .track:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    .track:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 925px) {
    .track:nth-child(3) {
      display: none;
    }
  }

  .track {
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

  .track:hover {
    background-color: #303030;
  }

  .track img {
    width: 18rem;
    height: 18rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .track div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .track div p {
    color: var(--gray);
    font-size: 1.5rem;
  }
`;

export default RecentlyPlayedTracks;
