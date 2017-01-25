import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { addLocaleData } from 'react-intl'
import zh from 'react-intl/locale-data/zh'
import configureRouter from './router'
import configureStore, { injectAsyncReducer } from './store'

const initLocale = new Promise((resolve, reject) => {
    addLocaleData([...zh]);
    const preference = window.localStorage.getItem('ICODE_LOCALE_PREFERENCE');
    const locale = (preference === 'en') ? preference : 'zh-CN';
    try {
        require([`./i18n/messages_${locale}`], module => {
            resolve({
                locale,
                messages: module.default
            })
        })
    } catch (err) {
        reject(err)
    }
});

initLocale.then(locale => {
    const appStore = configureStore({ locale });

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
});
