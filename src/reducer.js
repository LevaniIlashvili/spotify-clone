import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_USER_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_CURRENT_TRACK,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_ACCESS_TOKEN) {
    return { ...state, accessToken: action.payload };
  }
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  if (action.type === SET_USER_PLAYLISTS) {
    return { ...state, userPlaylists: action.payload };
  }
  if (action.type === SET_USER_LIKED_SONGS) {
    return { ...state, userLikedSongs: action.payload };
  }
  if (action.type === SET_CURRENT_TRACK) {
    return { ...state, currentTrack: action.payload };
  }
};

export default reducer;
