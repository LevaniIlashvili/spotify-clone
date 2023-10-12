import axios from "axios";
import { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import YourPlaylists from "../components/YourPlaylists";
import RecentlyPlayedTracks from "../components/RecentlyPlayedTracks";

const HomePage = () => {
  const { accessToken, userPlaylists } = useGlobalContext();

  // const getUserTopArtists = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0`,
  //       { headers: { Authorization: `Bearer ${accessToken}` } }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getUserTopArtists();
  }, []);

  return (
    <Wrapper>
      <div className="container">
        <YourPlaylists />
        <RecentlyPlayedTracks />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--black);
  height: calc(100vh - 11rem);
  padding: 0.8rem;
  color: var(--white);
  grid-column: 2/ 3;

  .container {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .container::-webkit-scrollbar {
    width: 1.25rem;
  }

  .container::-webkit-scrollbar-track {
    background: transparent;
  }

  .container::-webkit-scrollbar-thumb {
    background: transparent;
    height: 1rem;
  }

  .container:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.35);
  }

  .container::-webkit-scrollbar-thumb:hover {
    background: hsla(0, 0%, 100%, 0.5);
  }

  .container::-webkit-scrollbar-thumb:active {
    background: hsla(0, 0%, 100%, 0.7);
  }
`;

export default HomePage;
