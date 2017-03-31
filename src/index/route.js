import React from 'react'
import { EditableInput, ReadOnlyInput } from '../HOC/propsProxy'
import Input from '../HOC/inverseInherit'
import style from './index.less'

EditableInput.displayName = 'EditableInput';

const Root = () => {
    return (
        <div>
            <EditableInput className={style.input} name="editable-input" />
            <ReadOnlyInput className={style.input} name="useless-name" />
            <Input className={style.input} />
        </div>
    )
};

export const root = Root;