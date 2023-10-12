import { loginUrl } from "../spotify";
import styled from "styled-components";

function LoginPage() {
  return (
    <Wrapper>
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" />
      <a className="animated-btn" href={loginUrl}>
        login with spotify
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: calc(100vh);
  background-color: #000;
  color: #fff;
  font-size: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;

  a {
    background-color: #1ed760;
    color: #000;
    text-decoration: none;
    padding: 1.5rem 4rem;
    border-radius: 100px;
    text-transform: capitalize;
    font-weight: 600;
    text-align: center;
  }

  @media (max-width: 575px) {
    img {
      width: 80%;
    }

    a {
      width: 60%;
      font-size: 0.7em;
      padding: 0.9em 0.8em;
    }
  }
`;

export default LoginPage;
