import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import styled from "styled-components";

const UserContentSection = ({
  title,
  dataKey,
  endpoint,
  filterFunction,
  itemRenderer,
}) => {
  const { accessToken, userPlaylists } = useGlobalContext();
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (endpoint) {
      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(`${title} - `, response);
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
  }, []);

  if (!data) return null;

  return (
    <Wrapper>
      <div className="top">
        <h2>{title}</h2>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      <div className="content-container">
        {data
          .filter(filterFunction)
          .slice(0, showAll ? 20 : 7)
          .map((item) => itemRenderer(item))}
      </div>
    </Wrapper>
  );
};

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

  @media (max-width: 2010px) {
    .item:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1725px) {
    .item:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1440px) {
    .item:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1155px) {
    .item:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 925px) {
    .item:nth-child(3) {
      display: none;
    }
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
`;

export default UserContentSection;
