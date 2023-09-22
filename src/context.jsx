import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_USER_PLAYLISTS,
  SET_USER_LIKED_SONGS,
  SET_CURRENT_TRACK,
  SET_VOLUME,
  SET_IS_MUTED,
} from "./actions";

const initialState = {
  accessToken: "",
  user: null,
  currentTrack: "",
  volume: 100,
  isMuted: false,
  userPlaylists: [],
  userLikedSongs: [],
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

  const setCurrentTrack = async (track) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/tracks/4OROzZUy6gOWN4UGQVaZMF?si=74b6d887328e4b0f&nd=1",
        { headers }
      );
      console.log(response.data);
      dispatch({ type: SET_CURRENT_TRACK, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const setVolume = (volume) => {
    dispatch({ type: SET_VOLUME, payload: volume });
  };

  const setIsMuted = (boolean) => {
    dispatch({ type: SET_IS_MUTED, payload: boolean });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setAccessToken,
        setUser,
        setUserPlaylists,
        setUserLikedSongs,
        setCurrentTrack,
        setVolume,
        setIsMuted,
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
