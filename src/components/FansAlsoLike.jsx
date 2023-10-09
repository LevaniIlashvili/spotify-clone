import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import styled from "styled-components";

const FansAlsoLike = ({ artistId }) => {
  const { accessToken } = useGlobalContext();
  const [similarArtists, setSimilarArtists] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const getSimilarArtists = async () => {
    try {
      const response = await axios.get(
        `
      https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(response);
      setSimilarArtists(response.data.artists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!artistId) return;
    getSimilarArtists();
  }, [artistId]);

  if (!similarArtists) return;

  return (
    <Wrapper>
      <div className="top">
        <h2>Fans also like</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="similar-artists-container">
        {similarArtists.slice(0, showAll ? 20 : 7).map((artist) => {
          return (
            <div className="similar-artist" key={artist.id}>
              <img src={artist.images[2].url} alt="artist image" />
              <div>
                <h4>{artist.name}</h4>
                <p>Artist</p>
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
  }

  .top button {
    background: transparent;
    border: none;
    color: var(--gray);
  }

  .top button:hover {
    color: var(--white);
  }

  .similar-artists-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: 2rem;
  }

  @media (max-width: 1980px) {
    .similar-artist:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1700px) {
    .similar-artist:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1430px) {
    .similar-artist:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    .similar-artist:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 940px) {
    .similar-artist:nth-child(3) {
      display: none;
    }
  }

  .similar-artist {
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

  .similar-artist:hover {
    background-color: #303030;
  }

  .similar-artist img {
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .similar-artist div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .similar-artist div p {
    color: var(--gray);
    font-size: 1.5rem;
  }
`;

export default FansAlsoLike;
