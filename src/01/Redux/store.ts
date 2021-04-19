import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer, { DevicePageType } from './rootReducer';
import thunkMiddleWare from 'redux-thunk';
import rootSaga from './saga';
import { ReadingsStateType } from '../_api/houses_readings_page';
import { configureStore } from '@reduxjs/toolkit';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

// const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface RootState {
  readings: ReadingsStateType;
  devicePage: DevicePageType;
}

export const store = configureStore({
  reducer: rootReducer,
});

//   rootReducer,
//   composeEnhancers(
//     applyMiddleware(loggerMiddleware, thunkMiddleWare, sagaMiddleware)
//   )
// );

export type AppDispatch = typeof store.dispatch;

// sagaMiddleware.run(rootSaga);
