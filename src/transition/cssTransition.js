import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import style from './transition.less'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['hello', 'world', 'click', 'me']
        };
        this.handleAdd = this.handleAdd.bind(this)
    }
    handleAdd() {
        const newItems = [
            ...this.state.items,
            prompt('Enter some text')
        ];
        this.setState({ items: newItems })
    }
    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems })
    }
    render() {
        const items = this.state.items.map((item, i) => (
            <div key={item} onClick={() => this.handleRemove(i)}>
                {item}
            </div>
        ));
        return (
            <div>
                <CSSTransitionGroup
                    transitionName={{
                        enter: style.enter,
                        enterActive: style.enterActive,
                        leave: style.leave,
                        leaveActive: style.leaveActive
                    }}
                    transitionEnterTimeout={parseInt(style.enterDuration, 10)}
                    transitionLeaveTimeout={parseInt(style.leaveDuration, 10)}>
                    {items}
                </CSSTransitionGroup>
                <CSSTransitionGroup
                    transitionName="button"
                    transitionAppear
                    transitionAppearTimeout={parseInt(style.enterDuration, 10)}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <button onClick={this.handleAdd}>Add Item</button>
                </CSSTransitionGroup>
            </div>
        )
    }
}
