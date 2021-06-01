import * as React from 'react'
import { useState, useEffect } from 'react'
import { Form, Input, Spin } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'
import css from './login.module.styl'

function Login(props: RouteComponentProps): JSX.Element {
    const [form] = Form.useForm()
    const [loading, response, setLogin] = useLogin()
    const jump = (target: string): void => {
        props.history.push(target)
    }

    const onFinish = (): void => {
        form.validateFields().then(val => {
            setLogin(val)
        })
        // .catch(err => {
        //     console.log(err)
        // })
    }

    useEffect(() => {
        if (response?.data) {
            jump('/')
        }
    }, [response])

    return (
        <Spin spinning={loading} wrapperClassName={css.login}>
            <Form className="login-form" form={form}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <div className={css.btnWrap}>
                        <div className={css.btn} onClick={() => onFinish()}>
                            登录
                        </div>
                        <div className={css.btn} onClick={() => jump('/register')}>
                            注册
                        </div>
                    </div>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default withRouter(Login)
