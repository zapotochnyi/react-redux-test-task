import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";
import postsReducer from "./postsReducer";

let rootReducer = combineReducers({
  users: usersReducer,
  app: appReducer,
  posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
