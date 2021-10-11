import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // il va séléctionner index.js automatiquement dans le dossier reducers

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, composedEnhancer);

export default store;
