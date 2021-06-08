import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Spin } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useList from './hook/useList'

function List(props: RouteComponentProps): JSX.Element {
    const [form] = Form.useForm()
    const [loading, response, getList] = useList()
    const jump = (target: string): void => {
        props.history.push(target)
    }

    const onSearch = (): void => {
        form.validateFields().then(val => {})
    }

    useEffect(() => {
        getList({ password: 'ass', username: 'sd' })
    }, [])

    return (
        <div>
            <Form className="login-form" form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(List)
