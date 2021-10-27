import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
import sidebarPagesReducer from "./sidebarPagesReducer";
import taxoReducer from "./taxoReducer";
import optionsReducer from "./optionsReducer";

const rootReducer = combineReducers({
  options: optionsReducer,
  pages: pagesReducer,
  sidebarPages: sidebarPagesReducer,
  taxonomie: taxoReducer,
});

export default rootReducer;
