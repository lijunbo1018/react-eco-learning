import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'

class CountDown extends Component {
    static displayName = 'CountDown'
    state = {
        seconds: 5
    }
    componentDidMount() {
        this.props.setInterval(() => {
            this.setState({ seconds: this.state.seconds - 1 })
        }, 1000)
    }
    render() {
        return (
            <div>
                {this.state.seconds > 0
                    ? <span>{`${this.state.seconds} seconds left`}</span>
                    : <span>Time up</span>
                }
            </div>
        )
    }
}

export default ReactTimeout(CountDown)
