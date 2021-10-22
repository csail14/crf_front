import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
import sidebarPagesReducer from "./sidebarPagesReducer";
const rootReducer = combineReducers({
  pages: pagesReducer,
  sidebarPages: sidebarPagesReducer
});

export default rootReducer;
