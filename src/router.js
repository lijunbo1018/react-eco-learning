import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import App from './app'

export default getComponent => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="index" />
            <Route path="index" getComponent={getComponent('index/index')}></Route>
            <Route path="sample"></Route>
            <Route path="editor" getComponent={getComponent('editor/editor')}></Route>
        </Route>
    </Router>
)