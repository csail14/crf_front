import { LOAD_PAGES_INFO } from "./action-type";

export const loadPagesInfo = (pages) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_PAGES_INFO,
      payload: {
        pages: pages,
      },
    });
  };
};
