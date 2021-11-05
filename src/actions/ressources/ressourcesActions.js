import { LOAD_RESSOURCES_INFO, LOAD_RESULT_INFO } from "./action-type";

export const loadRessourcesInfo = (allRessources, results) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_RESSOURCES_INFO,
      payload: {
        allRessources: allRessources,
        results: results,
      },
    });
  };
};

export const loadResultInfo = (results) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_RESULT_INFO,
      payload: {
        results: results,
      },
    });
  };
};
