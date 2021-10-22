import { LOAD_TAXO_INFO } from "../actions/taxonomie/action-type";

const initialState = {
  tags: [],
  domainesActions: [],
  domainesImpacts: [],
};

const TaxoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAXO_INFO:
      return {
        tags: action.payload.tags,
        domainesActions: action.payload.domainesActions,
        domainesImpacts: action.payload.domainesImpacts,
      };
    default:
      return state;
  }
};

export default TaxoReducer;
