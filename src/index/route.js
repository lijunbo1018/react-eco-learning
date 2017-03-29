import React from 'react'
import { EditableInput, ReadOnlyInput } from '../HOC/propsProxy'
import style from './index.less'

const Root = () => {
    return (
        <div>
            <EditableInput className={style.input} name="editable-input" />
            <ReadOnlyInput className={style.input} name="useless-name" />
        </div>
    )
};

export const root = Root;