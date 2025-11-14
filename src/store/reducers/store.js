import { thunk } from "redux-thunk";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { todoReducer } from "./todoReducer";


const rootReducer = combineReducers({
  todo: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
