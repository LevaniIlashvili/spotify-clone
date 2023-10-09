import styled from "styled-components";
import { useGlobalContext } from "../context";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const { user, navbarContent } = useGlobalContext();

  return (
    <Wrapper>
      <div className="left-side">
        <button className="btn back-btn">
          <IoIosArrowBack />
        </button>
        <button className="btn forward-btn">
          <IoIosArrowForward />
        </button>
        <h3 className="navbar-content">{navbarContent}</h3>
      </div>
      <div className="right-side">
        <button className="btn animated-btn explore-premium-btn">
          Explore Premium
        </button>
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
