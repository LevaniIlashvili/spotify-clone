import styled from "styled-components";
import Track from "./Track";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useEffect, useState } from "react";

const ArtistPopularTracks = ({ artist }) => {
  const { accessToken } = useGlobalContext();
  const [artistsTopTracks, setArtistsTopTracks] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const getArtistsTopTracks = async () => {
    if (!artist) return;

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=GE`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setArtistsTopTracks(response.data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistsTopTracks();
  }, [artist]);

  return (
    <Wrapper>
      <p>Popular Tracks by</p>
      <h3>{artist?.name}</h3>
      <section className="tracks">
        {artistsTopTracks?.slice(0, showMore ? 10 : 5).map((track, index) => {
          console.log(track);
          if (track === null) return;
          return (
            <Track
              key={track.id}
              track={track}
              index={index + 1}
              playingFrom={{ type: "popularTracks", id: artist.id }}
              queue={artistsTopTracks}
            />
          );
        })}
        {artistsTopTracks?.length > 5 && (
          <button
            className="see-more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "See more"}
          </button>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  p {
    font-size: 1.4rem;
    color: var(--gray);
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  .see-more-btn {
    border: none;
    background: transparent;
    color: var(--gray);
    font-weight: 800;
  }

  .see-more-btn:hover {
    color: var(--white);
  }
`;

export default ArtistPopularTracks;
