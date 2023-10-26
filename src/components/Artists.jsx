import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import ArtistContextMenu from "./contextMenus/ArtistContextMenu";
import { useGlobalContext } from "../context";

const Artists = ({ artists, display }) => {
  const { isSidebarOpen } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <Wrapper className={display} $isSidebarOpen={isSidebarOpen}>
      {artists.map((artist, index) => {
        return (
          <ArtistContextMenu
            key={artist.id}
            artist={artist}
            className="artist-container"
          >
            <div
              className={`artist artist-${index + 1}`}
              onClick={() => navigate(`/artist/${artist.id}`)}
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
          </ArtistContextMenu>
        );
      })}
    </Wrapper>
  );
};

const sidebarClosedItemQueries = css`
  @media (max-width: 2090px) {
    &.limited .artist-10 {
      display: none;
    }
  }

  @media (max-width: 1889px) {
    &.limited .artist-9 {
      display: none;
    }
  }

  @media (max-width: 1689px) {
    &.limited .artist-8 {
      display: none;
    }
  }

  @media (max-width: 1489px) {
    &.limited .artist-7 {
      display: none;
    }
  }

  @media (max-width: 1289px) {
    &.limited .artist-6 {
      display: none;
    }
  }

  @media (max-width: 1089px) {
    &.limited .artist-5 {
      display: none;
    }
  }

  @media (max-width: 889px) {
    &.limited .artist-4 {
      display: none;
    }
  }

  @media (max-width: 689px) {
    &.limited .artist-3 {
      display: none;
    }
  }
`;

const sidebarOpenedItemQueries = css`
  &.limited .artist-10 {
    display: none;
  }

  &.limited .artist-9 {
    display: none;
  }

  &.limited .artist-8 {
    display: none;
  }

  @media (max-width: 1970px) {
    &.limited .artist-7 {
      display: none;
    }
  }

  @media (max-width: 1695px) {
    &.limited .artist-6 {
      display: none;
    }
  }

  @media (max-width: 1425px) {
    &.limited .artist-5 {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    &.limited .artist-4 {
      display: none;
    }
  }

  @media (max-width: 932px) {
    &.limited .artist-3 {
      display: none;
    }
  }
`;

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
    width: 18rem !important;
    height: 18rem !important;
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

  ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? sidebarOpenedItemQueries : sidebarClosedItemQueries}
`;

export default Artists;
