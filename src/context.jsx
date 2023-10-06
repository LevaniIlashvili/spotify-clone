import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_USER_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_PLAYLIST_SORT_TYPE,
  SET_PLAYLIST_FILTER_TEXT,
  SET_CURRENT_TRACK,
  SET_IS_TRACK_PLAYING,
  SET_PLAYLIST_BEING_PLAYED,
  SET_VOLUME,
  SET_IS_MUTED,
  SET_IS_SIDEBAR_OPEN,
} from "./actions";

const initialState = {
  accessToken: "",
  user: null,
  currentTrack: "",
  isTrackPlaying: false,
  playlistBeingPlayed: {},
  volume: 100,
  isMuted: false,
  userPlaylists: [],
  userLikedSongs: [],
  playlistSortType: "Recently Added",
  playlistFilterText: "",
  filteredPlaylists: [],
  isSidebarOpen: true,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const headers = { Authorization: `Bearer ${state.accessToken}` };

  const setAccessToken = (accessToken) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
  };

  const setUser = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers,
      });
      dispatch({ type: SET_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const setUserPlaylists = async () => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        { headers }
      );
      dispatch({ type: SET_USER_PLAYLISTS, payload: data.items });
    } catch (error) {
      console.log(error);
    }
  };

  const setUserLikedSongs = async () => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/tracks?limit=50",
        {
          headers,
        }
      );
      dispatch({ type: SET_USER_LIKED_SONGS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const setPlaylistSortType = (sortType) => {
    dispatch({ type: SET_PLAYLIST_SORT_TYPE, payload: sortType });
  };

  const setPlaylistFilterText = (text) => {
    dispatch({ type: SET_PLAYLIST_FILTER_TEXT, payload: text });
  };

  const setCurrentTrack = async (track) => {
    dispatch({ type: SET_CURRENT_TRACK, payload: track });
  };

  const setIsTrackPlaying = (boolean) => {
    dispatch({ type: SET_IS_TRACK_PLAYING, payload: boolean });
  };

  const setPlaylistBeingPlayed = (playlist) => {
    dispatch({ type: SET_PLAYLIST_BEING_PLAYED, payload: playlist });
  };

  const setVolume = (volume) => {
    dispatch({ type: SET_VOLUME, payload: volume });
  };

  const setIsMuted = (boolean) => {
    dispatch({ type: SET_IS_MUTED, payload: boolean });
  };

  const setIsSidebarOpen = (boolean) => {
    dispatch({ type: SET_IS_SIDEBAR_OPEN, payload: boolean });
  };

  // for search page
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/categories/pop/playlists",
        { headers }
      );
      // const response2 = await axios.get(
      //   `${response.data.categories.items[1].href}`,
      //   { headers }
      // );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // for search page
  // getCategories();

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAccessToken,
        setUser,
        setUserPlaylists,
        setUserLikedSongs,
        setPlaylistSortType,
        setPlaylistFilterText,
        setCurrentTrack,
        setIsTrackPlaying,
        setPlaylistBeingPlayed,
        setVolume,
        setIsMuted,
        setIsSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
