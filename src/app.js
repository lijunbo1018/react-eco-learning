import React from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import TopMenu from './navigator/components/TopMenu'

const AppRoot = ({ children, routes, locale, messages }) => (
    <IntlProvider locale={locale} messages={messages}>
        <div className="root-container">
            <TopMenu routes={routes} />
            <div className="page-content">
                {children}
            </div>
        </div>
    </IntlProvider>
);

export default connect(state => state.locale)(AppRoot)
