import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import './editor.less'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            code: '// talk is cheap, show me your code'
        }
    }
    onChange(code) {
        this.setState({ code })
    }
    render() {
        const options = {
            lineNumbers: true,
            mode: 'javascript'
        };
        return <CodeMirror value={this.state.code} onChange={this.onChange} options={options} />
    }
}

export const root = Editor;
