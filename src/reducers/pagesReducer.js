import { LOAD_PAGES_INFO } from "../actions/pages/action-type";

const initialState = {
  templates: [],
};

const PagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PAGES_INFO:
      return {
        templates: action.payload.pages,
      };
    default:
      return state;
  }
};

export default PagesReducer;
