import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Spin, Table } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useList from './hook/useList'

function List(props: RouteComponentProps): JSX.Element {
    const [form] = Form.useForm()
    const [loading, response, getList] = useList()
    const jump = (target: string): void => {
        props.history.push(target)
    }

    const onSearch = (): void => {
        form.validateFields().then(val => {
            getList({ page: 1, pageSize: 10, username: val.username })
        })
    }

    useEffect(() => {
        getList({ page: 1, pageSize: 10 })
    }, [])

    const columns = [
        {
            title: 'username',
            dataIndex: 'userName',
            key: 'userName'
        }
    ]

    return (
        <div>
            <Form className="login-form" form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <div onClick={() => onSearch()}>搜索</div>
            </Form>
            <Table
                loading={loading}
                dataSource={response?.data || []}
                columns={columns}
                rowKey={key => {
                    return key.id
                }}
            />
        </div>
    )
}

export default withRouter(List)
