import styled from "styled-components";
import { useGlobalContext } from "../context";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, navbarContent, setNavbarContent } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setNavbarContent(""), [location]);

  return (
    <Wrapper>
      <div className="left-side">
        <button className="btn back-btn" onClick={() => window.history.back()}>
          <IoIosArrowBack />
        </button>
        <button className="btn forward-btn">
          <IoIosArrowForward onClick={() => window.history.forward()} />
        </button>
        <h3 className="navbar-content">{navbarContent}</h3>
        {location.pathname.split("/")[1] === "search" && (
          <input
            type="search"
            className="search-input"
            placeholder="What do you want to listen to ?"
            onChange={({ target }) => navigate(`/search/${target.value}`)}
          />
        )}
      </div>
      <div className="right-side">
        {location.pathname.split("/")[1] !== "search" && (
          <button className="btn animated-btn explore-premium-btn">
            Explore Premium
          </button>
        )}
        <button className="btn animated-btn install-app-btn">
          Install App
        </button>
        <div className="user-img-container">
          <img src={user.images[0].url} alt="user image" className="user-img" />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin-bottom: 4rem;
  background-color: var(--black);
  grid-row: 1 / 2;
  grid-column: 2 /3;
  height: 100%;

  .left-side {
    display: flex;
    gap: 2rem;
  }

  .back-btn,
  .forward-btn {
    background: transparent;
    color: var(--white);
    border-radius: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .search-input {
    background-color: #242424;
    color: var(--white);
    border: none;
    padding: 1rem 1.5rem;
    border-radius: 3rem;
    width: 35rem;
    height: 4.5rem;
  }

  .search-input:focus {
    outline: 2px solid var(--white);
  }

  .navbar-content {
    color: var(--white);
    font-size: 2.2rem;
  }

  .right-side {
    display: flex;
    gap: 1rem;
  }

  .explore-premium-btn,
  .install-app-btn {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border-radius: 2.2rem;
    cursor: pointer;
  }

  .explore-premium-btn {
    color: var(--black);
    background-color: var(--white);
  }

  .install-app-btn {
    color: var(--white);
    background-color: var(--black);
  }

  .user-img-container {
    background-color: #0000008f;
    border-radius: 50%;
    height: 3.2rem;
    width: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-img {
    border-radius: 50%;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export default Navbar;
