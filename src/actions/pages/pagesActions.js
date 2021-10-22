import {LOAD_PAGES_INFO, LOAD_SIDEBAR_PAGES_INFO} from "./action-type";

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

export const loadSidebarInfo = (sidebarPages) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_SIDEBAR_PAGES_INFO,
      payload : {
        sidebarPages: sidebarPages,
      }
    })
  }
}