import React from 'react'
import { EditableInput, ReadOnlyInput } from '../HOC/propsProxy'
import { WrappedInput, ReadOnlyInput as Input } from '../HOC/inverseInherit'
import style from './index.less'

const Root = () => {
    return (
        <div>
            <EditableInput className={style.input} name="editable-input" />
            <ReadOnlyInput className={style.input} name="useless-name" />
            <WrappedInput className={style.input} />
            <Input className={style.input} />
        </div>
    )
};

export const root = Root;