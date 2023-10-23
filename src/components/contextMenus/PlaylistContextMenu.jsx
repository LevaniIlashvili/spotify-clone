import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import { useGlobalContext } from "../../context";

const PlaylistContextMenu = ({ children, playlist, renderedIn }) => {
  const { user, setIsEditPlaylistModalOpen } = useGlobalContext();

  if (!playlist) return children;

  return (
    <div>
      <ContextMenuTrigger id={`${renderedIn}-${playlist.id}`}>
        {children}
      </ContextMenuTrigger>
      <ContextMenu id={`${renderedIn}-${playlist.id}`}>
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
