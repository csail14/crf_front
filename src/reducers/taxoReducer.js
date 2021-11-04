import { LOAD_TAXO_INFO } from "../actions/Taxonomie/action-type";

const initialState = {
  tags: [],
  domainesActions: [],
  domainesImpacts: [],
  categories: [],
};

const TaxoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAXO_INFO:
      return {
        tags: action.payload.tags,
        domainesActions: action.payload.domainesActions,
        domainesImpacts: action.payload.domainesImpacts,
        categories: action.payload.categories,
      };
    default:
      return state;
  }
};

export default TaxoReducer;
