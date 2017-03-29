/**
 * @file 高阶组件之属性代理
 */
import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props);
        this.printName = this.printName.bind(this)
    }
    printName() {
        console.log(`Wrapped component's name: ${this.props.name}`)
    }
    render() {
        return <input name="name" {...this.props} />
    }
}

const Editable = WrappedComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'I am editable'
        };
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({ value: e.target.value })
    }
    printName(instance) {
        instance.printName()
    }
    render() {
        const newProps = {
            value: this.state.value,
            onChange: this.onChange,
            ref: this.printName.bind(this)
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
