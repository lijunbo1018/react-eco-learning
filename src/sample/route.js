import React from 'react'
import { Form, InputNumber, Switch, Slider, Select, DatePicker, Button } from 'antd'
import { injectIntl } from 'react-intl'

const Item = Form.Item;
const Option = Select.Option;

const Samples = ({ intl }) => {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    };
    return (
        <Form>
            <Item {...formItemLayout} label={intl.formatMessage({id: 'numberInput'})}>
                <InputNumber min={1} max={10} defaultValue={3} />
                <span>{intl.formatMessage({id: 'machine'})}</span>
                <a href="#" style={{ marginLeft: 20 }}>{intl.formatMessage({id: 'link'})}</a>
            </Item>
            <Item {...formItemLayout} label={intl.formatMessage({id: 'switcher'})}>
                <Switch />
            </Item>
            <Item {...formItemLayout} label={intl.formatMessage({id: 'slider'})}>
                <Slider />
            </Item>
            <Item {...formItemLayout} label={intl.formatMessage({id: 'select'})}>
                <Select defaultValue="3" style={{ width: 200 }}>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                </Select>
            </Item>
            <Item {...formItemLayout} label={intl.formatMessage({id: 'datePicker'})}>
                <DatePicker size="default" style={{ width: 200 }} />
            </Item>
            <Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" size="default">{intl.formatMessage({id: 'confirm'})}</Button>
                <Button size="default" style={{ marginLeft: 10 }}>{intl.formatMessage({id: 'cancel'})}</Button>
            </Item>
        </Form>
    )
};

export const root = injectIntl(Samples);
