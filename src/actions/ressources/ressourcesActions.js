import { LOAD_RESULT_INFO } from "./action-type";

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
