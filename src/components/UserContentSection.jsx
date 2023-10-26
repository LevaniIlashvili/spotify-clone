import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import styled, { css } from "styled-components";

const UserContentSection = ({
  title,
  dataKey,
  endpoint,
  filterFunction,
  itemRenderer,
}) => {
  const { accessToken, userPlaylists, isSidebarOpen } = useGlobalContext();
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (endpoint) {
      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setData(response.data[dataKey]);
      } catch (error) {
        console.log(error);
      }
    } else {
      setData(userPlaylists);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userPlaylists]);

  if (!data) return null;

  return data.length ? (
    <Wrapper
      className={showAll ? "full" : "limited"}
      $isSidebarOpen={isSidebarOpen}
    >
      <div className="top">
        <h2>{title}</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="content-container">
        {data
          .filter(filterFunction)
          .slice(0, showAll ? 20 : 10)
          .map((item) => itemRenderer(item))}
      </div>
    </Wrapper>
  ) : (
    ""
  );
};

const sidebarClosedItemQueries = css`
  @media (max-width: 2090px) {
    &.limited .item-container:nth-child(10) {
      display: none;
    }
  }

  @media (max-width: 1889px) {
    &.limited .item-container:nth-child(9) {
      display: none;
    }
  }

  @media (max-width: 1689px) {
    &.limited .item-container:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: 1489px) {
    &.limited .item-container:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1289px) {
    &.limited .item-container:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1089px) {
    &.limited .item-container:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 889px) {
    &.limited .item-container:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 689px) {
    &.limited .item-container:nth-child(3) {
      display: none;
    }
  }
`;

const sidebarOpenedItemQueries = css`
  &.limited .item-container:nth-child(10) {
    display: none;
  }

  &.limited .item-container:nth-child(9) {
    display: none;
  }

  &.limited .item-container:nth-child(8) {
    display: none;
  }

  @media (max-width: 2010px) {
    &.limited .item-container:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1725px) {
    &.limited .item-container:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    &.limited .item-container:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    &.limited .item-container:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 925px) {
    &.limited .item-container:nth-child(3) {
      display: none;
    }
  }
`;

const Wrapper = styled.section`
  margin-bottom: 2rem;

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

  .content-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
    gap: 2rem;
  }

  .item {
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

  .item:hover {
    background-color: #303030;
  }

  .item img {
    width: 18rem;
    height: 18rem;
    border-radius: 5px;
    margin-bottom: 2rem;
    box-shadow: 0rem 0rem 4rem #161616;
  }

  .stock-image-container {
    width: 18rem;
    height: 18rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stock-image {
    color: var(--gray);
    width: 100%;
    font-size: 10rem;
  }

  .item div {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .item div p {
    color: var(--gray);
    font-size: 1.5rem;
  }

  ${({ $isSidebarOpen }) => {
    return $isSidebarOpen ? sidebarOpenedItemQueries : sidebarClosedItemQueries;
  }}
`;

export default UserContentSection;
