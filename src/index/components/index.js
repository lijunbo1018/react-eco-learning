import React from 'react'

export const root = () => (
    <div>
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
);