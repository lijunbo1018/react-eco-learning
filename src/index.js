import React from 'react'
import ReactDOM from 'react-dom'
import configureRouter from './router'
import './common/anticon'

const getComponent = path => (nextState, callback) => {
    require(`bundle-loader!./${path}/route`)(module => {
        callback(null, module.root)
    })
};

const initRender = () => {
    const root = document.createElement('div');
    root.classList.add('root');
    document.body.appendChild(root);

    ReactDOM.render(
        configureRouter(getComponent),
        root
    )
};

initRender();
