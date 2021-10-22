import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
const rootReducer = combineReducers({
  pages: pagesReducer,
});

export default rootReducer;
