import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "../../reducers/index";
// import {loadState, saveState} from "../../store/localStorage"

import moviesReducer from './../features/movies/moviesSlice'
import filterReducer from './../features/filter/filterSlice'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    filter: filterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

// const persistedState = loadState();

// const store = createStore(
//   rootReducer,
//   persistedState,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
  
// );

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
