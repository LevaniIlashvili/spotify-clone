import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import { SET_ACCESS_TOKEN, SET_USER } from "./actions";

const initialState = {
  accessToken: "",
  user: null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log(state.user);

  const setAccessToken = (accessToken) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
  };

  const setUser = async () => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
      });
      console.log(data);
      dispatch({ type: SET_USER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ ...state, setAccessToken, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
