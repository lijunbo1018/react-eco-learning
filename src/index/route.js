import React from 'react'
import style from './index.less'

const Index = () => {
    return (
        <div>
            <h1 className={style.greet}>你好, React技术栈</h1>
        </div>
    )
};

export const root = Index;