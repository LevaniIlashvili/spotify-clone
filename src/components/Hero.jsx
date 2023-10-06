import styled from "styled-components";

const Hero = ({ img, type, name, userName, children }) => {
  return (
    <Wrapper>
      <div className="info">
        <img src={img} className="main-img" />
        <div className="info-text">
          <p className="type">{type}</p>
          <h1 className="name">{name}</h1>
          <div>
            <p className="user-name">{userName}</p>
            {children}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%), #686767;
  width: 100%;
  height: 30rem;
  border-radius: 8px 8px 0 0;
  padding: 1.5rem 2rem;

  .info {
    display: flex;
    height: 100%;
    align-items: flex-end;
    gap: 2rem;
    color: #ffffff;
  }

  .main-img {
    width: 23.2rem;
    height: 23.2rem;
    box-shadow: #292929 1rem 1rem 6rem;
  }

  .info-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .type {
    font-size: 1.35rem;
  }

  .name {
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  /*
  @media screen and (max-width: 1150px) {
    .name {
      font-size: 7rem;
    }
  }
  
  @media screen and (max-width: 1000px) {
    .name {
      font-size: 4rem;
    }
  } */

  .info-text div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
  }

  .playlist-duration {
    color: var(--gray);
  }
`;

export default Hero;
