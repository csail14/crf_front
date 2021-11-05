import {
  LOAD_RESSOURCES_INFO,
  LOAD_RESULT_INFO,
} from "../actions/ressources/action-type";

const initialState = {
  allRessources: [],
  results: [],
};

const OptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESSOURCES_INFO:
      return {
        allRessources: action.payload.allRessources,
        results: state.results,
      };

    case LOAD_RESULT_INFO:
      return {
        allRessources: state.allRessources,
        results: action.payload.results,
      };
    default:
      return state;
  }
};

export default OptionsReducer;
