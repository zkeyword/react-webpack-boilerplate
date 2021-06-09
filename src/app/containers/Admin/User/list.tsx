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
    const [page, setPage] = useState(1)
    const [username, setUsername] = useState()
    const onSearch = (): void => {
        form.validateFields().then(val => {
            setPage(1)
            setUsername(val.username)
        })
    }
    const columns = [
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username'
        }
    ]

    useEffect(() => {
        getList({ page, pageSize: 10, username })
    }, [page, username])

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
                dataSource={response?.data?.list || []}
                columns={columns}
                rowKey={key => {
                    return key.id
                }}
                pagination={{
                    total: response?.data?.total || 0,
                    onChange: val => setPage(val)
                }}
            />
        </div>
    )
}

export default withRouter(List)
