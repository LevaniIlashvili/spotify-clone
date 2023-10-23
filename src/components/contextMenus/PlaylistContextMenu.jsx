import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";

const PlaylistContextMenu = ({ children, playlist, renderedIn }) => {
  const {
    user,
    setIsEditPlaylistModalOpen,
    checkIfPlaylistIsFollowed,
    togglePlaylistFollow,
    userPlaylists,
    setIsCreatePlaylistModalOpen,
  } = useGlobalContext();
  const [isFollowed, setIsFollowed] = useState(false);

  const checkFollow = async () => {
    const response = await checkIfPlaylistIsFollowed(playlist);
    setIsFollowed(response);
  };

  useEffect(() => {
    checkFollow();
  }, [playlist, userPlaylists]);

  if (!playlist) return children;

  return (
    <div>
      <ContextMenuTrigger id={`${renderedIn}-${playlist.id}`}>
        {children}
      </ContextMenuTrigger>
      <ContextMenu id={`${renderedIn}-${playlist.id}`}>
        {(renderedIn === "sidebar" || renderedIn === "sidebar-shrinked") && (
          <MenuItem onClick={() => setIsCreatePlaylistModalOpen(true)}>
            Create playlist
          </MenuItem>
        )}
        {playlist.owner.id !== user.id && (
          <MenuItem
            onClick={() => {
              togglePlaylistFollow(playlist.id, isFollowed);
              setIsFollowed(!isFollowed);
            }}
          >
            {isFollowed ? "Unfollow playlist" : "Follow playlist"}
          </MenuItem>
        )}
        {playlist.owner.id === user.id && (
          <MenuItem
            onClick={() =>
              setIsEditPlaylistModalOpen({
                open: true,
                playlist,
              })
            }
          >
            Edit details
          </MenuItem>
        )}
      </ContextMenu>
    </div>
  );
};

export default PlaylistContextMenu;
