import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import userReducer from "../reducers/user";
import logger from 'redux-logger'
export default () => {
    const store = createStore(
        combineReducers({
            user:userReducer,

        }),
        applyMiddleware(logger,thunk)
    )
    return store;
}