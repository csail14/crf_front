import { LOAD_TOKEN } from "../actions/user/action-type";

const initialState = {
  token: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TOKEN:
      return {
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default UserReducer;
