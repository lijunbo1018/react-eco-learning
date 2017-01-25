import React, { Component } from 'react'
import { Menu, Icon, Select } from 'antd'
import { Link } from 'react-router'
import { version } from '../../versions'

const Item = Menu.Item;
const Option = Select.Option;

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            active: props.routes[1].path || 'index'
        }
    }
    handleClick(e) {
        this.setState({ active: e.key })
    }
    render() {
        return (
            <header className="top-menu">
                <div className="version">
                    <a href={version.url} target="_blank">{version.name}</a>
                </div>
                <Select value="zh-CN">
                    <Option key="zh-CN">简体中文</Option>
                    <Option key="en">English</Option>
                </Select>
                <Menu mode="horizontal" selectedKeys={[this.state.active]} onClick={this.handleClick}>
                    <Item key="index">
                        <Link to="/index"><Icon type="home" />首页</Link>
                    </Item>
                    <Item key="sample">
                        <Link to="/sample"><Icon type="appstore-o" />示例</Link>
                    </Item>
                    <Item key="editor">
                        <Link to="/editor"><Icon type="code-o" />编辑器</Link>
                    </Item>
                </Menu>
            </header>
        )
    }
}

export default TopMenu