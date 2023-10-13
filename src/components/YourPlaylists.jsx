import { useGlobalContext } from "../context";
import UserContentSection from "./UserContentSection";

const YourPlaylists = () => {
  const { user, userPlaylists } = useGlobalContext();

  return (
    userPlaylists.length && (
      <UserContentSection
        title="Your playlists"
        filterFunction={(playlist) => playlist.owner.id === user.id}
        itemRenderer={(playlist) => {
          return (
            <div className="item" key={playlist.id}>
              <img src={playlist.images[1].url} alt="item image" />
              <div>
                <h4>{playlist.name}</h4>
                <p>By {playlist.owner.display_name}</p>
              </div>
            </div>
          );
        }}
      />
    )
  );
};

export default YourPlaylists;
