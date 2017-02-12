import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import marked from 'marked'
import 'codemirror/mode/markdown/markdown'
import './editor.less'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            code: '<!--在此输入你的Markdown文本-->\n'
        }
    }
    onChange(code) {
        this.setState({ code })
    }
    render() {
        const options = {
            lineNumbers: true,
            mode: 'markdown'
        };
        const { code } = this.state;
        return (
            <div className="editor-container">
                <section>
                    <CodeMirror value={code} onChange={this.onChange} options={options} />
                </section>
                <section dangerouslySetInnerHTML={{ __html: marked(code) }} />
            </div>
        )
    }
}

export const root = Editor;
