/**
 * @file 高阶组件之属性代理
 */
import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props);
        this.printName = this.printName.bind(this)
    }
    // These method will be invoked in case of properties proxy
    // did mount goes first, will unmount goes last
    componentDidMount() {
        console.log('Input did mount')
    }
    componentWillUnmount() {
        console.log('Input will unmount')
    }
    printName() {
        const { input } = this.refs;
        console.log(`Wrapped component is an ${input.tagName} named ${input.name}`)
    }
    render() {
        return <input ref="input" name="name" {...this.props} />
    }
}

const Editable = WrappedComponent => class extends Component {
    static displayName = 'EditableInput';
    constructor(props) {
        super(props);
        this.state = {
            value: 'I am editable'
        }
    }
    // did mount goes last, will unmount goes first
    componentDidMount() {
        console.log(`${this.constructor.displayName} did mount`)
    }
    componentWillUnmount() {
        console.log(`${this.constructor.displayName} will unmount`)
    }
    onChange(e) {
        this.setState({ value: e.target.value })
    }
    render() {
        const newProps = {
            value: this.state.value,
            onChange: this.onChange,
            ref: instance => instance && instance.printName()
        };
        return <WrappedComponent {...this.props} {...newProps} />
    }
};

const ReadOnly = (name, value = 'I am read-only') => WrappedComponent => props => {
    const newProps = {
        // this will override 'name' from HOC
        name,
        value,
        readOnly: true
    };
    return <WrappedComponent {...props} {...newProps} />
};

export const EditableInput = Editable(Input);
export const ReadOnlyInput = ReadOnly('read-only-input')(Input);
ReadOnlyInput.displayName = 'ReadOnlyInput';
