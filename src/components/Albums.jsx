import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Albums = ({ albums, display }) => {
  const navigate = useNavigate();

  return (
    <Wrapper className={display}>
      {albums.map((album) => {
        console.log(album);
        const year = new Date(album.release_date).getFullYear();

        return (
          <div
            onClick={() => navigate(`/album/${album.id}`)}
            key={album.id}
            className="album"
          >
            <img src={album.images[0].url} alt="album image" />
            <div>
              <h4>{album.name}</h4>
              <span>
                <p>{year} • </p>
                {album.artists.map((artist, index, self) => {
                  return (
                    <Link
                      key={artist.id}
                      to={`/artist/${artist.id}`}
                      className="artist-link"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {artist.name}
                      {index + 1 !== self.length && ", "}
                    </Link>
                  );
                })}
              </span>
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

  .album {
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

  .album:hover {
    background-color: #303030;
  }

  .album img {
    width: 18rem;
    height: 18rem;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .album div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .album div h4 {
    width: calc(100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .album div p {
    display: inline;
    color: var(--gray);
    font-size: 1.5rem;
  }

  .album div span {
    font-size: 1.45rem;
  }

  .artist-link {
    color: var(--gray);
    text-decoration: none;
    z-index: 100;
  }

  .artist-link:hover {
    text-decoration: underline;
    color: var(--white);
  }

  @media (max-width: 1980px) {
    &.limited .album:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1700px) {
    &.limited .album:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1430px) {
    &.limited .album:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1160px) {
    &.limited .album:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 940px) {
    &.limited .album:nth-child(3) {
      display: none;
    }
  }

  /* @media (max-width: 940px) {
    &.limited .album:nth-child(3) {
      display: none;
    }
  } */
`;

export default Albums;
