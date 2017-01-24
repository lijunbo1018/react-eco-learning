import React, { Component } from 'react'
import TopMenu from './navigator/components/TopMenu'

export default ({ children, routes }) => (
    <div className="root-container">
        <TopMenu routes={routes} />
        <div className="page-content">
            {children}
        </div>
    </div>
)
