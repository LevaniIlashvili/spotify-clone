import { useNavigate } from "react-router-dom";
import UserContentSection from "./UserContentSection";

const RecentlyPlayedTracks = () => {
  const navigate = useNavigate();

  return (
    <UserContentSection
      title="Recently played tracks"
      dataKey="items"
      endpoint="https://api.spotify.com/v1/me/player/recently-played"
      filterFunction={(track, index, self) => {
        return (
          self.findIndex((t) => t.track?.id === track?.track?.id) === index
        );
      }}
      itemRenderer={({ track }) => {
        if (!track) return null;
        return (
          <div
            onClick={() => navigate(`/track/${track.id}`)}
            className="item"
            key={track.id}
          >
            <img src={track.album.images[1].url} alt="item image" />
            <div>
              <h4>{track.name}</h4>
              <p>{track.artists[0].name}</p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default RecentlyPlayedTracks;
