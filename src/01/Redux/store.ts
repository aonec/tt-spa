import createSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";
import thunkMiddleWare from "redux-thunk";
import rootSaga from "./saga";
import {ReadingsStateType} from "../_api/houses_readings_page";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const loggerMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    console.log('Middleware', store.getState());
    return result;
};



const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface RootState {
    readings: ReadingsStateType;
}


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleWare, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);