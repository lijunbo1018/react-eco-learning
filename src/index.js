import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import AppRouter from './router'
import configureStore, { injectAsyncReducer } from './store'

const initialState = {
    locale: 'zh-CN'
};

const appStore = configureStore(initialState);

const initRender = () => {
    const root = document.createElement('div');
    document.body.appendChild(root);

    ReactDOM.render(
        <Provider store={appStore}>
            {AppRouter}
        </Provider>,
        root
    )
};

initRender();