import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import administrator from "./reducers/administrator";
import thunk from "redux-thunk";

const allReducers = combineReducers({
  administrator,
});

export default createStore(allReducers, applyMiddleware(thunk));
