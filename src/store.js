import 'babel-polyfill'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as globalReducers from './common/global/reducers'

const createReducer = asyncReducers => combineReducers(Object.assign({}, globalReducers, asyncReducers));

export const injectAsyncReducer = (store, name, reducer) => {
    store.asyncReducers[name] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers))
};

export default initialState => {
    const store = createStore(createReducer(), initialState, compose(
        applyMiddleware(thunkMiddleware),
        typeof window.devToolsExtension === 'function' ? window.devToolsExtension() : f => f
    ));
    store.asyncReducers = {};
    return store
}