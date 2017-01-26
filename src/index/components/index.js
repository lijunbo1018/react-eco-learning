import React from 'react'
import { connect } from 'react-redux'
import '../index.less'

const component = ({ locale }) => {
    if (locale === 'en') {
        return (
            <div className="introduction">
                <h1>Sample project built with Webpack</h1>
                <section>
                    <h2>Intend to solve problems below：</h2>
                    <ul>
                        <ol>1. Import ant design dependencies on demand</ol>
                        <ol>2. Distinguish multiple versions at build phase</ol>
                        <ol>3. "require-conf.js" grows rapidly, RequireJS could be discard</ol>
                        <ol>4. Package and compress assets by directory is not reasonable</ol>
                        <ol>5. Customize ant design theme in an elegant manner</ol>
                    </ul>
                </section>
            </div>
        )
    }
    return (
        <div className="introduction">
            <h1>使用Webpack构建的示例项目</h1>
            <section>
                <h2>试图解决如下问题：</h2>
                <ul>
                    <ol>1. ant design不能按需引入</ol>
                    <ol>2. 区分内外版本硬编码逻辑</ol>
                    <ol>3. require-conf.js日益变大，替换RequireJS</ol>
                    <ol>4. 按目录代码打包压缩不科学</ol>
                    <ol>5. 自定义ant design主题</ol>
                </ul>
            </section>
        </div>
    )
};

export const root = connect(state => state.locale)(component);