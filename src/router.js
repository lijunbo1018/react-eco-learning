import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import App from './app'

export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="index" />
            <Route path="index"></Route>
            <Route path="sample"></Route>
            <Route path="editor"></Route>
        </Route>
    </Router>
)