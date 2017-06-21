import React, { Component } from 'react'
import CountDown from '../HOC/reactTimeout'
import style from './index.less'

class Container extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <CountDown />
        )
    }
}

export const root = Container;