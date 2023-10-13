import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import styled from "styled-components";

const YourTopArtists = () => {
  const { accessToken } = useGlobalContext();
  const [showAll, setShowAll] = useState(false);
  const [userTopArtists, setUserTopArtists] = useState(null);

  const getUserTopArtists = async () => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(response);
      setUserTopArtists(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTopArtists();
  }, []);

  if (!userTopArtists) return;

  return (
    <Wrapper>
      <div className="top">
        <h2>Your top artists</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="your-top-artists-container">
        {userTopArtists.slice(0, showAll ? 20 : 7).map((artist) => {
          console.log(artist);
          return (
            <div className="artist" key={artist.id}>
              <img src={artist.images[1].url} alt="artist image" />
              <div>
                <h4>{artist.name}</h4>
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

  .your-top-artists-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }

  @media (max-width: 2010px) {
    .artist:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1725px) {
    .artist:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    .artist:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    .artist:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 925px) {
    .artist:nth-child(3) {
      display: none;
    }
  }

  .artist {
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

  .artist img {
    width: 18rem;
    height: 18rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .artist div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .artist div p {
    color: var(--gray);
    font-size: 1.5rem;
  }
`;

export default YourTopArtists;
