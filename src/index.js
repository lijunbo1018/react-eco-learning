import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureStore, { injectAsyncReducer } from './store'

const initialState = {
    locale: 'zh-CN'
};

const appStore = configureStore(initialState);

const App = () => (
    <h1>Hello, world</h1>
);

const initRender = () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    ReactDOM.render(
        <Provider store={appStore}>
            <App />
        </Provider>,
        root
    )
};

initRender();