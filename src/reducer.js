import { SET_ACCESS_TOKEN, SET_USER } from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_ACCESS_TOKEN) {
    return { ...state, accessToken: action.payload };
  }
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
};

export default reducer;
