import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Spin, Table } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useList, { ColumnType } from './hook/useList'
import css from './list.module.styl'

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
    const columns: ColumnType = [
        {
            title: 'username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '操作',
            render: (text, record) => {
                return <div onClick={() => open(record.id)}>xxx</div>
            }
        }
    ]

    const open = id => {
        console.log(id)
    }

    useEffect(() => {
        getList({ page, pageSize: 10, username })
    }, [page, username])

    return (
        <div className={css.pageList}>
            <Form className={css.search} form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <div className={css.btn} onClick={() => onSearch()}>
                    搜索
                </div>
            </Form>
            <Table
                className={css.list}
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
