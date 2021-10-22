import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
import taxoReducer from "./taxoReducer";
const rootReducer = combineReducers({
  pages: pagesReducer,
  taxonomie: taxoReducer,
});

export default rootReducer;
