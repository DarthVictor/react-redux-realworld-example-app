import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import createRootReducer from "./reducer";

import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

export const getMiddleware = (isForTests) => {
  if (isForTests || process.env.NODE_ENV === "production") {
    return [myRouterMiddleware, promiseMiddleware, localStorageMiddleware];
  } else {
    // Enable additional logging in non-production environments.
    return [
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      createLogger(),
    ];
  }
};
export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...getMiddleware()))
);
