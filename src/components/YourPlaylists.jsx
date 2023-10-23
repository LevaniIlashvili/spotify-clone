import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import UserContentSection from "./UserContentSection";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";

const YourPlaylists = () => {
  const { user, userPlaylists, setIsEditPlaylistModalOpen } =
    useGlobalContext();
  const navigate = useNavigate();

  return (
    userPlaylists.length && (
      <UserContentSection
        title="Your playlists"
        filterFunction={(playlist) => playlist.owner.id === user.id}
        itemRenderer={(playlist) => {
          return (
            <div key={playlist.id} className="item-container">
              <ContextMenuTrigger id={`your-playlists-${playlist.id}`}>
                <div
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className="item"
                >
                  <img src={playlist.images[1]?.url} alt="item image" />
                  <div>
                    <h4>{playlist.name}</h4>
                    <p>By {playlist.owner.display_name}</p>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenu id={`your-playlists-${playlist.id}`}>
                {playlist.owner.id === user.id && (
                  <MenuItem
                    data={{ action: "edit playlist details" }}
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
        }}
      />
    )
  );
};

export default YourPlaylists;
