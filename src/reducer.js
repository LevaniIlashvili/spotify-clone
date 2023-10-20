import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_USER_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_PLAYLIST_SORT_TYPE,
  SET_PLAYLIST_FILTER_TEXT,
  SET_CURRENT_TRACK,
  SET_IS_TRACK_PLAYING,
  SET_QUEUE,
  SET_VOLUME,
  SET_IS_MUTED,
  SET_IS_SIDEBAR_OPEN,
  SET_NAVBAR_CONTENT,
  SET_IS_PLAYLIST_MODAL_OPEN,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_PLAYLISTS:
      return {
        ...state,
        userPlaylists: action.payload,
        filteredPlaylists: action.payload,
      };
    case SET_USER_LIKED_SONGS:
      return { ...state, userLikedSongs: action.payload };
    case SET_PLAYLIST_SORT_TYPE: {
      let filteredPlaylists = [];
      if (action.payload === "Recently Added") {
        filteredPlaylists = state.userPlaylists;
      } else if (action.payload === "Alphabetical") {
        filteredPlaylists = [...state.userPlaylists].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (action.payload === "Creator") {
        filteredPlaylists = [...state.userPlaylists].sort((a, b) => {
          const ownerOrder = {
            [state.user.display_name]: 1,
            Spotify: 2,
          };

          const ownerA = a.owner.display_name;
          const ownerB = b.owner.display_name;

          if (ownerOrder[ownerA] && ownerOrder[ownerB]) {
            return ownerOrder[ownerA] - ownerOrder[ownerB];
          } else if (ownerOrder[ownerA]) {
            return -1;
          } else if (ownerOrder[ownerB]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        filteredPlaylists = state.userPlaylists;
      }
      return { ...state, playlistSortType: action.payload, filteredPlaylists };
    }
    case SET_PLAYLIST_FILTER_TEXT: {
      const filteredPlaylists = [...state.userPlaylists].filter((playlist) =>
        playlist.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        playlistFilterText: action.payload,
        filteredPlaylists,
      };
    }
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload };
    case SET_IS_TRACK_PLAYING:
      return { ...state, isTrackPlaying: action.payload };
    case SET_QUEUE:
      return { ...state, queue: action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_IS_MUTED:
      return { ...state, isMuted: action.payload };
    case SET_IS_SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: action.payload };
    case SET_NAVBAR_CONTENT:
      return { ...state, navbarContent: action.payload };
    case SET_IS_PLAYLIST_MODAL_OPEN:
      return { ...state, isPlaylistModalOpen: action.payload };
    default:
      return state;
  }
};

export default reducer;
