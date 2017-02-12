import React from 'react'
import { connect } from 'react-redux'

const Samples = ({ locale }) => {
    let component;
    if (locale === 'en') {
        component = <h1>Components samples go here</h1>
    } else {
        component = <h1>组件示例</h1>
    }
    return component
};

export const root = connect(state => state.locale)(Samples);
