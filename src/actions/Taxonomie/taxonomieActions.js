import { LOAD_TAXO_INFO } from "./action-type";

export const loadTaxoInfo = (
  tags,
  domainesActions,
  domainesImpacts,
  categories
) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_TAXO_INFO,
      payload: {
        tags: tags,
        domainesActions: domainesActions,
        domainesImpacts: domainesImpacts,
        categories: categories,
      },
    });
  };
};
