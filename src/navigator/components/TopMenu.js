import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Select } from 'antd'
import { Link } from 'react-router'
import { injectIntl } from 'react-intl'
import { version } from '../../versions'
import { reloadLocale } from '../../common/global/actions'

const Item = Menu.Item;
const Option = Select.Option;

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
        const { intl, locale, switchLocale } = this.props;
        return (
            <header className="top-menu">
                <div className="version">
                    <a href={version.url} target="_blank">{version.name}</a>
                </div>
                <Select value={locale} onChange={switchLocale}>
                    <Option key="zh-CN">简体中文</Option>
                    <Option key="en">English</Option>
                </Select>
                <Menu mode="horizontal" selectedKeys={[this.state.active]} onClick={this.handleNavClick}>
                    <Item key="index">
                        <Link to="/index"><Icon type="home" />{intl.formatMessage({id: 'index'})}</Link>
                    </Item>
                    <Item key="sample">
                        <Link to="/sample"><Icon type="appstore-o" />{intl.formatMessage({id: 'sample'})}</Link>
                    </Item>
                    <Item key="editor">
                        <Link to="/editor"><Icon type="code-o" />{intl.formatMessage({id: 'editor'})}</Link>
                    </Item>
                </Menu>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        locale: state.locale.locale
    }
};

const mapDispatchToProps = dispatch => {
    return {
        switchLocale: locale => dispatch(reloadLocale(locale))
    }
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TopMenu))