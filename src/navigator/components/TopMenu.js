import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'

const Item = Menu.Item;

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.handleNavClick = this.handleNavClick.bind(this);
        this.state = {
            active: props.routes[1].path || 'index'
        }
    }
    handleNavClick(e) {
        this.setState({ active: e.key })
    }
    render() {
        return (
            <header className="top-menu">
                <div className="version">
                    <a href="/">React</a>
                </div>
                <Menu mode="horizontal" selectedKeys={[this.state.active]} onClick={this.handleNavClick}>
                    <Item key="index">
                        <Link to="/index"><Icon type="home" />首页</Link>
                    </Item>
                </Menu>
            </header>
        )
    }
}

export default TopMenu