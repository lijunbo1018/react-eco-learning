import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './contents'
import src from '../img/all.png'

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
    <div>
        <Hello name="world" />
        <img className="pure-img" src={src} />
        <div className="hint" />
    </div>,
    root
);
