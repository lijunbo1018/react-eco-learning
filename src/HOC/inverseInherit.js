/**
 * @file 高阶组件之反向继承
 */
import 'babel-polyfill'
import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <input name="name" {...this.props} />
    }
}

const WrappedInput = WrappedComponent => class extends WrappedComponent {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(JSON.stringify(this.props));
        return super.render()
    }
};

const ReadOnly = WrappedComponent => class extends WrappedComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const elementsTree = super.render();
        let newProps = {};
        if (elementsTree && elementsTree.type === 'input') {
            newProps = {
                readOnly: true,
                value: 'I was forced to be read-only'
            }
        }
        const props = Object.assign({}, elementsTree.props, newProps);
        return React.cloneElement(elementsTree, props, elementsTree.children)
    }
};

export default ReadOnly(WrappedInput(Input))
