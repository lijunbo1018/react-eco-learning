import React, { Component } from 'react'
import { Menu, Icon, Select } from 'antd'

const Item = Menu.Item;
const Option = Select.Option;

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            active: 'index'
        }
    }
    handleClick(e) {
        this.setState({ active: e.key })
    }
    render() {
        return (
            <header className="top-menu">
                <div className="version">
                    <span>iCode</span>
                </div>
                <Select value="zh-CN">
                    <Option key="zh-CN">简体中文</Option>
                    <Option key="en">英文</Option>
                </Select>
                <Menu mode="horizontal" selectedKeys={[this.state.active]} onClick={this.handleClick}>
                    <Item key="index"><Icon type="home" />首页</Item>
                    <Item key="sample"><Icon type="appstore-o" />示例</Item>
                    <Item key="editor"><Icon type="code-o" />编辑器</Item>
                </Menu>
            </header>
        )
    }
}

export default TopMenu