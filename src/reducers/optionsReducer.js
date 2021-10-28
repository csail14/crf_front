import { LOAD_OPTIONS_INFO } from "../actions/pages/action-type";

const initialState = {
  options: [],
  footerMenu: [],
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OPTIONS_INFO:
      return {
        options: action.payload.options,
        footerMenu: action.payload.footerMenu,
      };
    default:
      return state;
  }
};

export default OptionsReducer;
