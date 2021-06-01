import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import './register.styl'

function Login(props: RouteComponentProps): JSX.Element {
    const [form] = Form.useForm()
    const [loading, response, setLogin] = useLogin()
    const jump = (target: string): void => {
        props.history.push(target)
    }

    console.log(loading, response)

    const onFinish = () => {
        form.validateFields().then(async val => {
            setLogin(val)
        })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    useEffect(() => {
        if (response?.data) {
            if (props.history.location.pathname !== '/login') {
                props.history.push('/')
            }
        }
    }, [response])

    return (
        <div className="login">
            <Form className="login-form" form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <div className="btn" onClick={() => onFinish()}>
                        登录
                    </div>
                    <div className="btn" onClick={() => jump('/register')}>
                        注册
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(Login)
