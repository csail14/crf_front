import { LOAD_RESULT_INFO } from "../actions/ressources/action-type";

const initialState = {
  results: [],
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESULT_INFO:
      return {
        results: action.payload.results,
      };
    default:
      return state;
  }
};

export default OptionsReducer;
