import { useNavigate } from "react-router-dom";
import UserContentSection from "./UserContentSection";

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

export default YourTopTracks;
