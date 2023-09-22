import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_USER_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_CURRENT_TRACK,
  SET_VOLUME,
  SET_IS_MUTED,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_PLAYLISTS:
      return { ...state, userPlaylists: action.payload };
    case SET_USER_LIKED_SONGS:
      return { ...state, userLikedSongs: action.payload };
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_IS_MUTED:
      return { ...state, isMuted: action.payload };
    default:
      return state;
  }
};

export default reducer;
