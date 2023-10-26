import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import UserContentSection from "./UserContentSection";
import PlaylistContextMenu from "./contextMenus/PlaylistContextMenu";
import { BsMusicNoteBeamed } from "react-icons/bs";

const YourPlaylists = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <UserContentSection
      title="Your playlists"
      filterFunction={(playlist) => playlist.owner.id === user.id}
      itemRenderer={(playlist) => {
        return (
          <div key={playlist.id} className="item-container">
            <PlaylistContextMenu
              playlist={playlist}
              renderedIn="your-playlists-section"
            >
              <div
                onClick={() => navigate(`/playlist/${playlist.id}`)}
                className="item"
              >
                {playlist.images[1]?.url ? (
                  <img src={playlist.images[1]?.url} alt="item image" />
                ) : (
                  <div className="stock-image-container">
                    <BsMusicNoteBeamed className="stock-image" />
                  </div>
                )}
                <div>
                  <h4>{playlist.name}</h4>
                  <p>By {playlist.owner.display_name}</p>
                </div>
              </div>
            </PlaylistContextMenu>
          </div>
        );
      }}
    />
  );
};

export default YourPlaylists;
