import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import styled from "styled-components";
import Artists from "./Artists";

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
      <Artists artists={similarArtists.slice(0, showAll ? 20 : 7)} />
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
`;

export default FansAlsoLike;
