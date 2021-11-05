import { combineReducers } from "redux";
import pagesReducer from "./pagesReducer";
import sidebarPagesReducer from "./sidebarPagesReducer";
import taxoReducer from "./taxoReducer";
import optionsReducer from "./optionsReducer";
import ressourcesReducer from "./ressourcesReducer";

const rootReducer = combineReducers({
  options: optionsReducer,
  pages: pagesReducer,
  sidebarPages: sidebarPagesReducer,
  taxonomie: taxoReducer,
  ressources: ressourcesReducer,
});

export default rootReducer;
