import React, { Component } from 'react'
import TopMenu from './navigator/components/TopMenu'

export default ({ children }) => (
    <div className="root-container">
        <TopMenu />
        <div className="page-content">
            {children}
        </div>
    </div>
)
