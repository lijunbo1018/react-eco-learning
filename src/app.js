import React from 'react'
import TopMenu from './navigator/components/TopMenu'
import './common/style.less'

const AppRoot = ({ children, routes }) => (
    <div className="root-container">
        <TopMenu routes={routes} />
        <div className="page-content">
            {children}
        </div>
    </div>
);

export default AppRoot
