import React, { Component } from 'react'
import TodoList from '../transition/cssTransition'
import style from './index.less'

class Container extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TodoList />
        )
    }
}

export const root = Container;