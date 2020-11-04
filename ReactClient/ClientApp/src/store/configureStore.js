import { applyMiddleware, compose, createStore } from "redux";
import createRootReducer from "./index";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.log('persistingState:', err);
  }
};


export default function configureStore(initialState) {
  const store = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(...middlewares)));
  store.subscribe(() => {
    saveState({
      auth: store.getState().auth,
      router: store.getState().router
    });
  });

  return store;
}

export { history };