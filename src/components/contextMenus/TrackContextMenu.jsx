import { useState } from "react";
import {
  ContextMenuTrigger,
  MenuItem,
  SubMenu,
  ContextMenu,
} from "react-contextmenu";
import { useGlobalContext } from "../../context";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TrackContextMenu = ({
  children,
  track,
  getPlaylistTracks,
  currentPlaylist,
}) => {
  const {
    userPlaylists,
    user,
    accessToken,
    checkIsTrackLiked,
    toggleTrackLiked,
  } = useGlobalContext();
  const navigate = useNavigate();

  const [isPlaylistSubMenuHovered, setIsPlaylistSubMenuHovered] =
    useState(false);
  const [isArtistSubMenuHovered, setIsArtistSubMenuHovered] = useState(false);

  const removeTrackFromPlaylist = async () => {
    try {
      const response = await axios.delete(
        `https://api.spotify.com/v1/playlists/${currentPlaylist?.id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: {
            tracks: [
              {
                uri: `spotify:track:${track.id}`,
              },
            ],
          },
        }
      );
      getPlaylistTracks();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addTrackToPlaylist = async (playlistId) => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: [`spotify:track:${track.id}`],
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(user.id, currentPlaylist);

  if (!track) return children;

  return (
    <Wrapper>
      <ContextMenuTrigger id={track.id}>{children}</ContextMenuTrigger>
      <ContextMenu id={track.id}>
        <div
          onMouseEnter={() => setIsPlaylistSubMenuHovered(true)}
          onMouseLeave={() => setIsPlaylistSubMenuHovered(false)}
        >
          <SubMenu title="Add to playlist">
            <div
              className={`context-menu-library ${
                isPlaylistSubMenuHovered ? "" : "hidden"
              }`}
            >
              {userPlaylists.map((playlist) => {
                return (
                  playlist.owner.id === user.id && (
                    <MenuItem
                      key={playlist.id}
                      onClick={() => addTrackToPlaylist(playlist.id)}
                    >
                      {playlist.name}
                    </MenuItem>
                  )
                );
              })}
            </div>
          </SubMenu>
        </div>
        {user.id === currentPlaylist?.owner.id && (
          <MenuItem onClick={() => removeTrackFromPlaylist()}>
            Remove from this playlist
          </MenuItem>
        )}
        <MenuItem
          onClick={() => toggleTrackLiked(track, checkIsTrackLiked(track))}
        >
          {checkIsTrackLiked(track)
            ? "Remove from your Liked Songs"
            : "Save to your Liked Songs"}
        </MenuItem>
        {track.artists.length > 1 ? (
          <div
            onMouseEnter={() => setIsArtistSubMenuHovered(true)}
            onMouseLeave={() => setIsArtistSubMenuHovered(false)}
          >
            <SubMenu title="Go to artist">
              <div
                className={`context-menu-artists ${
                  isArtistSubMenuHovered ? "" : "hidden"
                }`}
              >
                {track.artists.map((artist) => {
                  return (
                    <MenuItem
                      key={artist.id}
                      onClick={() => navigate(`/artist/${artist.id}`)}
                    >
                      {artist.name}
                    </MenuItem>
                  );
                })}
              </div>
            </SubMenu>
          </div>
        ) : (
          <MenuItem onClick={() => navigate(`/artist/${track.artists[0].id}`)}>
            Go to Artist
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate(`/album/${track.album.id}`)}>
          Go to album
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

export default TrackContextMenu;
