import {
  LOAD_TYPE_FILTER,
  LOAD_KEYWORD_FILTER,
  LOAD_FORMATS_FILTER,
  LOAD_CATS_FILTER,
  LOAD_DATE_FILTER,
  LOAD_IMPACTS_FILTER,
  DELETE_ALL_FILTER,
  LOAD_ACTIONS_FILTER,
} from "./action-type";

export const loadTypeFilter = (type) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_TYPE_FILTER,
      payload: {
        type: type,
      },
    });
  };
};
export const loadKeywordsFilter = (keywords) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_KEYWORD_FILTER,
      payload: {
        keywords: keywords,
      },
    });
  };
};
export const loadFormatsFilter = (formats) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_FORMATS_FILTER,
      payload: {
        formats: formats,
      },
    });
  };
};
export const loadCategoriesFilter = (categories) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_CATS_FILTER,
      payload: {
        categories: categories,
      },
    });
  };
};
export const loadDateFilter = (date) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_DATE_FILTER,
      payload: {
        date: date,
      },
    });
  };
};

export const loadImpactsFilter = (impacts) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_IMPACTS_FILTER,
      payload: {
        impacts: impacts,
      },
    });
  };
};
export const loadActionsFilter = (actions) => {
  return function (dispatch) {
    dispatch({
      type: LOAD_ACTIONS_FILTER,
      payload: {
        actions: actions,
      },
    });
  };
};
export const resetAllFilter = () => {
  return function (dispatch) {
    dispatch({
      type: DELETE_ALL_FILTER,
      payload: {},
    });
  };
};
