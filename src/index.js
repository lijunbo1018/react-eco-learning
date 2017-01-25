import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureRouter from './router'
import configureStore, { injectAsyncReducer } from './store'

const initialState = {
    locale: 'zh-CN'
};

const appStore = configureStore(initialState);

const getComponent = path => (nextState, callback) => {
    require([`./${path}`], component => {
        const { root, name, reducer } = component;
        if (name && typeof reducer === 'function') {
            injectAsyncReducer(appStore, name, reducer)
        }
        callback(null, root)
    })
};

const initRender = () => {
    const root = document.createElement('div');
    root.classList.add('root');
    document.body.appendChild(root);

    ReactDOM.render(
        <Provider store={appStore}>
            {configureRouter(getComponent)}
        </Provider>,
        root
    )
};

initRender();