import { ContextMenuTrigger, MenuItem, ContextMenu } from "react-contextmenu";
import { useGlobalContext } from "../../context";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ArtistContextMenu = ({ children, artist }) => {
  const { checkIfFollowingArtist, toggleArtistFollow } = useGlobalContext();
  const [isFollowing, setIsFollowing] = useState(false);

  const checkFollow = async (artist) => {
    const response = await checkIfFollowingArtist(artist.id);
    setIsFollowing(response);
  };

  useEffect(() => {
    checkFollow(artist);
  }, [artist]);

  if (!artist) return children;

  return (
    <Wrapper>
      <ContextMenuTrigger id={artist.id}>{children}</ContextMenuTrigger>
      <ContextMenu id={artist.id}>
        <MenuItem
          onClick={() => {
            toggleArtistFollow(artist.id, isFollowing);
            setIsFollowing(!isFollowing);
          }}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </MenuItem>
      </ContextMenu>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hidden {
    display: none;
  }

  .context-menu-library {
    height: 25rem;
    width: 100%;
    overflow-y: scroll;
  }

  .context-menu-library::-webkit-scrollbar {
    width: 1.25rem;
  }

  .context-menu-library::-webkit-scrollbar-track {
    background: transparent;
  }

  .context-menu-library::-webkit-scrollbar-thumb {
    background: transparent;
    height: 1rem;
  }

  .context-menu-library:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, 0.35);
  }

  .context-menu-library::-webkit-scrollbar-thumb:hover {
    background: hsla(0, 0%, 100%, 0.5);
  }

  .context-menu-library::-webkit-scrollbar-thumb:active {
    background: hsla(0, 0%, 100%, 0.7);
  }
`;

export default ArtistContextMenu;
