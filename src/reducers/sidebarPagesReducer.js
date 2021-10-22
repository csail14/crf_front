import { LOAD_SIDEBAR_PAGES_INFO } from "../actions/pages/action-type";

const initialState = {
  templates: [],
};

const CycleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SIDEBAR_PAGES_INFO:
      return {
        templates: action.payload.sidebarPages,
      };
    default:
      return state;
  }
};

export default CycleReducer;
