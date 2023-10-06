export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "58896f70fcc34df8abeaf5bbd54e83ba";
const redirectUri = "http://localhost:5173/";
const scope =
  "user-read-recently-played user-library-modify user-read-private user-read-currently-playing user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state playlist-read-private user-library-read";

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;
