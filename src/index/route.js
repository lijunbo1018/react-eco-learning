import React, { Component } from 'react'
import { EditableInput } from '../HOC/propsProxy'
import { ReadOnlyInput } from '../HOC/inverseInherit'
import style from './index.less'

class Container extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            showInput: true
        }
    }
    onClick() {
        this.setState({ showInput: !this.state.showInput })
    }
    render() {
        return (
            <div>
                {this.state.showInput && <EditableInput className={style.input} name="editable-input" />}
                {this.state.showInput && <ReadOnlyInput className={style.input} name="read-only-input" />}
                <button onClick={this.onClick}>Click to toggle</button>
            </div>
        )
    }
}

export const root = Container;