import React, { Component } from 'react'
import { NavItem, PureNavItem } from './pureComponent'
import style from './index.less'

class Container extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            className: ''
        }
    }
    onClick() {
        const { className } = this.state;
        this.setState({ className: className ? '' : style.highlight })
    }
    render() {
        return (
            <div className={this.state.className}>
                <NavItem text="non-pure nav item" />
                <PureNavItem text="pure nav item" />
                <PureNavItem text="broken pure nav item" env={+ new Date()} />
                <button onClick={this.onClick}>Click to toggle</button>
            </div>
        )
    }
}

export const root = Container;