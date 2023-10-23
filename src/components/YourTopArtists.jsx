import { useNavigate } from "react-router-dom";
import UserContentSection from "./UserContentSection";
import ArtistContextMenu from "./contextMenus/ArtistContextMenu";

const YourTopArtists = () => {
  const navigate = useNavigate();

  return (
    <UserContentSection
      title="Your top artists"
      dataKey="items"
      endpoint="https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0"
      filterFunction={(artist) => artist}
      itemRenderer={(artist) => {
        if (!artist) return null;

        return (
          <div key={artist.id} className="item-container">
            <ArtistContextMenu artist={artist}>
              <div
                onClick={() => navigate(`/artist/${artist.id}`)}
                className="item"
                key={artist.id}
              >
                <img src={artist.images[1].url} alt="item image" />
                <div>
                  <h4>{artist.name}</h4>
                </div>
              </div>
            </ArtistContextMenu>
          </div>
        );
      }}
    />
  );
};

export default YourTopArtists;
