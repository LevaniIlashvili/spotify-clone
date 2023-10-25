import styled from "styled-components";

const Hero = ({ img, type, name, userName, children, description }) => {
  return (
    <Wrapper>
      <div className="info">
        <img src={img} className="main-img" />
        <div className="info-text">
          <span className="type">{type}</span>
          <h1
            className="name"
            style={{ fontSize: name.length >= 30 ? "3vw" : "5vw" }}
          >
            {name}
          </h1>
          {description && <span className="description">{description}</span>}
          <div>
            <a href="#" className="user-name">
              {userName} •
            </a>
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
  height: 34rem;
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

  .type,
  .description {
    font-size: 1.35rem;
  }

  .name {
    font-size: 5vw;
    margin-bottom: 1rem;
  }

  .description {
    color: var(--gray);
    margin-bottom: 1rem;
  }

  .info-text div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 1.4rem;
  }

  a {
    text-decoration: none;
    color: var(--white);
  }

  a:hover {
    text-decoration: underline;
  }

  .user-name {
    font-weight: 700;
  }

  .playlist-duration {
    color: var(--gray);
  }
`;

export default Hero;
