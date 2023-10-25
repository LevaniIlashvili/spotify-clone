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
  accessToken: localStorage.getItem("accessToken"),
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
    if (playlists) {
      dispatch({ type: SET_USER_PLAYLISTS, payload: playlists });
    } else {
      try {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          { headers }
        );
        dispatch({ type: SET_USER_PLAYLISTS, payload: data.items });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setUserLikedSongs = async (userLikedSongs) => {
    if (userLikedSongs) {
      dispatch({ type: SET_USER_LIKED_SONGS, payload: userLikedSongs });
    } else {
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
    }
  };

  const checkIsTrackLiked = (track) => {
    const likedSongsUris = state.userLikedSongs?.items?.map(
      (likedSong) => likedSong.track?.uri
    );
    return likedSongsUris?.includes(track?.uri);
  };

  const toggleTrackLiked = async (track, isTrackLiked) => {
    try {
      await axios({
        method: isTrackLiked ? "delete" : "put",
        url: `https://api.spotify.com/v1/me/tracks?ids=${track.id}`,
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
          "Content-Type": "application/json",
        },
        data: { ids: [track.id] },
      });
      setUserLikedSongs();
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfFollowingArtist = async (id) => {
    if (!id) return false;
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${id}`,
        { headers: { Authorization: `Bearer ${state.accessToken}` } }
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const toggleArtistFollow = async (id, isFollowing) => {
    if (!id) return false;
    try {
      if (isFollowing) {
        await axios.delete(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            data: {
              ids: [`${id}`],
            },
            headers: { Authorization: `Bearer ${state.accessToken}` },
          }
        );
      } else {
        await axios.put(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            ids: [`${id}`],
          },
          { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkIfPlaylistIsFollowed = async (playlist) => {
    if (!playlist) return;
    if (state.user.id !== playlist?.owner.id) {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlist.id}/followers/contains?ids=${state.user.id}`,
          { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
        return response.data[0];
      } catch (error) {
        console.log(error);
      }
    }
  };

  const togglePlaylistFollow = async (id, isPlaylistFollowed) => {
    try {
      if (isPlaylistFollowed) {
        await axios.delete(
          `https://api.spotify.com/v1/playlists/${id}/followers`,
          {
            headers: { Authorization: `Bearer ${state.accessToken}` },
          }
        );
        const updatedPlaylists = state.userPlaylists.filter(
          (playlist) => playlist.id !== id
        );
        setUserPlaylists(updatedPlaylists);
      } else {
        await axios.put(
          `https://api.spotify.com/v1/playlists/${id}/followers`,
          {},
          { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
        const playlist = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}`,
          { headers: { Authorization: `Bearer ${state.accessToken}` } }
        );
        const updatedPlaylists = [playlist.data, ...state.userPlaylists];
        setUserPlaylists(updatedPlaylists);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavbarScroll = (playBtnRef, content) => {
    const playBtn = playBtnRef.current;
    const navbar = document.querySelector("nav");
    if (playBtn && navbar) {
      const playBtnPosition = playBtn.getBoundingClientRect();
      const navbarPosition = navbar.getBoundingClientRect();

      if (navbarPosition.bottom >= playBtnPosition.top) {
        if (!state.navbarContent) {
          setNavbarContent(content);
        }
      } else {
        if (state.navbarContent) {
          setNavbarContent("");
        }
      }
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
        checkIsTrackLiked,
        toggleTrackLiked,
        checkIfFollowingArtist,
        toggleArtistFollow,
        checkIfPlaylistIsFollowed,
        togglePlaylistFollow,
        handleNavbarScroll,
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
