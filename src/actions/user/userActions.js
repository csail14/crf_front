import { LOAD_TOKEN } from "./action-type";

export const loadToken = (token) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_TOKEN,
      payload: {
        token: token,
      },
    });
  };
};
