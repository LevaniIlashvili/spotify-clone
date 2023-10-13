import UserContentSection from "./UserContentSection";

const YourTopArtists = () => {
  return (
    <UserContentSection
      title="Your top artists"
      dataKey="items"
      endpoint="https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20&offset=0"
      filterFunction={(artist) => artist}
      itemRenderer={(artist) => {
        if (!artist) return null;

        return (
          <div className="item" key={artist.id}>
            <img src={artist.images[1].url} alt="item image" />
            <div>
              <h4>{artist.name}</h4>
            </div>
          </div>
        );
      }}
    />
  );
};

export default YourTopArtists;
