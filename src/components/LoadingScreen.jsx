import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <Wrapper>
      <div className="dot dot-1"></div>
      <div className="dot dot-2"></div>
      <div className="dot dot-3"></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--black);
  min-height: calc(100vh - 8rem);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  grid-column: 2 / 3;

  .dot {
    width: 0.8rem;
    height: 0.8rem;
    background-color: var(--white);
    border-radius: 50%;
    animation: bounce 0.4s infinite alternate;
  }

  .dot-1 {
    animation-delay: 0.1s;
  }

  .dot-2 {
    animation-delay: 0.2s;
  }

  .dot-3 {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-0.8rem);
    }
  }
`;

export default LoadingScreen;
