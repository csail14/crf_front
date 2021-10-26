import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
import sidebarPagesReducer from "./sidebarPagesReducer";
import taxoReducer from "./taxoReducer";

const rootReducer = combineReducers({
  pages: pagesReducer,
  sidebarPages: sidebarPagesReducer,
    taxonomie: taxoReducer,
});

export default rootReducer;
