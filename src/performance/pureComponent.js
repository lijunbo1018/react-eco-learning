import React, { PureComponent } from 'react'

const Item = ({ children, env }) => {
    console.log(`Item rendered in ${env} at ${+new Date()}`);
    return <li>{children}</li>
};

// Item will always be re-rendered
export const NavItem = ({ text }) => (
    <Item env="non-pure">
        <span>{text}</span>
    </Item>
);

// Item will be re-rendered only if property 'env' changed
export const PureNavItem = class extends PureComponent {
    static defaultProps = {
        env: 'pure'
    };
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Item env={this.props.env}>
                <span>{this.props.text}</span>
            </Item>
        )
    }
};
