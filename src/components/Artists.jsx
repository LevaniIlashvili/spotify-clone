import styled from "styled-components";
import Artist from "./Artist";

const Artists = ({ artists }) => {
  return (
    <Wrapper>
      {artists.map((artist) => {
        return <Artist artist={artist} key={artist.id} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 2rem;
`;

export default Artists;
