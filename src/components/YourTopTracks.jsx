import { useNavigate } from "react-router-dom";
import UserContentSection from "./UserContentSection";
import TrackContextMenu from "./contextMenus/TrackContextMenu";

const YourTopTracks = () => {
  const navigate = useNavigate();

  return (
    <UserContentSection
      title="Your top tracks"
      dataKey="items"
      endpoint="https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20&offset=0"
      filterFunction={(track) => track}
      itemRenderer={(track) => {
        if (!track) return null;

        return (
          <div className="item-container" key={track.id}>
            <TrackContextMenu track={track}>
              <div
                onClick={() => navigate(`/track/${track.id}`)}
                className="item"
              >
                <img src={track.album.images[1].url} alt="item image" />
                <div>
                  <h4>{track.name}</h4>
                  <p>{track.artists[0].name}</p>
                </div>
              </div>
            </TrackContextMenu>
          </div>
        );
      }}
    />
  );
};

export default YourTopTracks;
