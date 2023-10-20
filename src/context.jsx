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
  SET_QUEUE,
  SET_VOLUME,
  SET_IS_MUTED,
  SET_IS_SIDEBAR_OPEN,
  SET_NAVBAR_CONTENT,
  SET_IS_CREATE_PLAYLIST_MODAL_OPEN,
  SET_IS_EDIT_PLAYLIST_MODAL_OPEN,
} from "./actions";

const initialState = {
  accessToken: "",
  user: null,
  currentTrack: "",
  isTrackPlaying: false,
  queue: [],
  volume: 100,
  isMuted: false,
  userPlaylists: [],
  userLikedSongs: [],
  playlistSortType: "Recently Added",
  playlistFilterText: "",
  filteredPlaylists: [],
  isSidebarOpen: true,
  navbarContent: "",
  isCreatePlaylistModalOpen: false,
  isEditPlaylistModalOpen: { open: false, playlist: null },
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

  const setUserPlaylists = async (playlists) => {
    console.log(playlists);
    if (playlists) {
      dispatch({ type: SET_USER_PLAYLISTS, payload: playlists });
    } else {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          { headers }
        );
        console.log(data.items);
        dispatch({ type: SET_USER_PLAYLISTS, payload: data.items });
      } catch (error) {
        console.log(error);
      }
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

  const setQueue = (queue) => {
    dispatch({ type: SET_QUEUE, payload: queue });
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

  const setNavbarContent = (content) => {
    dispatch({ type: SET_NAVBAR_CONTENT, payload: content });
  };

  const setIsCreatePlaylistModalOpen = (boolean) => {
    dispatch({ type: SET_IS_CREATE_PLAYLIST_MODAL_OPEN, payload: boolean });
  };

  const setIsEditPlaylistModalOpen = (object) => {
    dispatch({ type: SET_IS_EDIT_PLAYLIST_MODAL_OPEN, payload: object });
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
        setQueue,
        setVolume,
        setIsMuted,
        setIsSidebarOpen,
        setNavbarContent,
        setIsCreatePlaylistModalOpen,
        setIsEditPlaylistModalOpen,
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
