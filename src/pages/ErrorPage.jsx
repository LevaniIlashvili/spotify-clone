import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png"
        alt=""
      />
      <h1>Page not found</h1>
      <p>We can’t seem to find the page you are looking for.</p>
      <button onClick={() => navigate("/")}>Home</button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  position: absolute;
  color: var(--white);

  img {
    width: 6rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 4.5rem;
  }

  p {
    color: var(--gray);
    margin-bottom: 2rem;
  }

  button {
    padding: 1.5rem 3rem;
    font-size: 1.6rem;
    font-weight: 600;
    border-radius: 3rem;
    cursor: pointer;
  }
`;

export default ErrorPage;
