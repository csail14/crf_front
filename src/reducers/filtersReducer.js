import {
  LOAD_TYPE_FILTER,
  LOAD_KEYWORD_FILTER,
  LOAD_FORMATS_FILTER,
  LOAD_CATS_FILTER,
  LOAD_DATE_FILTER,
  LOAD_IMPACTS_FILTER,
  LOAD_ACTIONS_FILTER,
  DELETE_ALL_FILTER,
} from "../actions/filter/action-type";
import { data } from "../utils/data";
const initialState = {
  keywords: "",
  formats: [],
  types: [],
  categories: [],
  date: data.date_ressources[0],
  impacts: [],
  actions: [],
};

const FiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TYPE_FILTER:
      return {
        keywords: state.keywords,
        formats: state.formats,
        types: action.payload.type,
        categories: state.categories,
        date: state.date,
        impacts: state.impacts,
        actions: state.actions,
      };
    case LOAD_KEYWORD_FILTER:
      return {
        keywords: action.payload.keywords,
        formats: state.formats,
        types: state.types,
        categories: state.categories,
        date: state.date,
        impacts: state.impacts,
        actions: state.actions,
      };
    case LOAD_FORMATS_FILTER:
      return {
        keywords: state.keywords,
        formats: action.payload.formats,
        types: state.types,
        categories: state.categories,
        date: state.date,
        impacts: state.impacts,
        actions: state.actions,
      };
    case LOAD_CATS_FILTER:
      return {
        keywords: state.keywords,
        formats: state.formats,
        types: state.types,
        categories: action.payload.categories,
        date: state.date,
        impacts: state.impacts,
        actions: state.actions,
      };
    case LOAD_DATE_FILTER:
      return {
        keywords: state.keywords,
        formats: state.formats,
        types: state.types,
        categories: state.categories,
        date: action.payload.date,
        impacts: state.impacts,
        actions: state.actions,
      };
    case LOAD_IMPACTS_FILTER:
      return {
        keywords: state.keywords,
        formats: state.formats,
        types: state.types,
        categories: state.categories,
        date: state.date,
        impacts: action.payload.impacts,
        actions: state.actions,
      };
    case LOAD_ACTIONS_FILTER:
      return {
        keywords: state.keywords,
        formats: state.formats,
        types: state.types,
        categories: state.categories,
        date: state.date,
        impacts: state.impacts,
        actions: action.payload.actions,
      };
    case DELETE_ALL_FILTER:
      return {
        keywords: "",
        formats: [],
        types: [],
        categories: [],
        date: data.date_ressources[0],
        impacts: [],
        actions: [],
      };
    default:
      return state;
  }
};

export default FiltersReducer;
