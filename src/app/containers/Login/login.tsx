import { Button, Form, Input, Spin } from 'antd'
import classnames from 'classnames'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useLogin from '@/app/hooks/useLogin'
import useRegister from '@/app/hooks/useRegister'
import { captcha } from '@/app/services/baseServer/commonServer'

import css from './login.module.styl'

export default (): JSX.Element => {
    const navigate = useNavigate()
    const [loginForm] = Form.useForm()
    const [loginLoading, loginResponse, setLogin] = useLogin()
    const [registerForm] = Form.useForm()
    const [registerLoading, registerResponse, setRegister] = useRegister()
    const [captchaID, setCaptchaID] = useState('')
    const [captchaIMG, setCaptchaIMG] = useState('')
    const [isRefreshCaptchaIMG, setRefreshCaptchaIMG] = useState(true)
    const [type, setType] = useState(0)

    const onLoginFinish = (): void => {
        loginForm.validateFields().then(val => {
            setLogin({
                captchaID,
                ...val
            })
        })
    }

    const onRegisterFinish = (): void => {
        registerForm.validateFields().then(val => {
            setLogin({
                captchaID,
                ...val
            })
        })
    }

    useEffect(() => {
        if (loginResponse?.data) {
            navigate('/userList')
        }
    }, [loginResponse])

    useEffect(() => {
        if (registerResponse?.data) {
            navigate('/userList')
        }
        return () => {}
    }, [registerResponse])

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const r = await captcha()
            setCaptchaID(r.headers['captcha-id'])
            setCaptchaIMG(URL.createObjectURL(r.data))
            setRefreshCaptchaIMG(false)
        }
        if (isRefreshCaptchaIMG) {
            fetch()
        }
    }, [isRefreshCaptchaIMG])

    return (
        <div className={css.login}>
            <div className={css.text}>
                <div className={css.title}>用数据赋能营销</div>
                <div className={css.subTitle}>让流量变现更简单</div>
            </div>
            <div className={css.main}>
                <div className={css.tab}>
                    <div className={classnames(css.tabItem, { [css.cur]: type === 0 })} onClick={() => setType(0)}>
                        账号登录
                    </div>
                    <div className={classnames(css.tabItem, { [css.cur]: type === 1 })} onClick={() => setType(1)}>
                        注册
                    </div>
                </div>
                {type === 0 ? (
                    <Spin spinning={loginLoading} key={0}>
                        <Form form={loginForm}>
                            <div className={css.formItem}>
                                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                    <Input placeholder="Username" />
                                </Form.Item>
                            </div>
                            <div className={css.formItem}>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                            <div className={css.formItem}>
                                <Form.Item name="code" rules={[{ required: true, message: 'Please input captcha!' }]}>
                                    <Input placeholder="Captcha" />
                                </Form.Item>
                                <img src={captchaIMG} onClick={() => setRefreshCaptchaIMG(true)} alt="" />
                            </div>
                            <div className={css.formItem}>
                                <Button className={css.btn} onClick={() => onLoginFinish()}>
                                    登录
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                ) : (
                    <Spin spinning={registerLoading} key={1}>
                        <Form form={registerForm}>
                            <div className={css.formItem}>
                                <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                                    <Input placeholder="Username" />
                                </Form.Item>
                            </div>
                            <div className={css.formItem}>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                            </div>
                            <div className={css.formItem}>
                                <Form.Item name="code" rules={[{ required: true, message: 'Please input captcha!' }]}>
                                    <Input placeholder="Captcha" />
                                </Form.Item>
                                <img src={captchaIMG} onClick={() => setRefreshCaptchaIMG(true)} alt="Captcha" />
                            </div>
                            <div className={css.formItem}>
                                <Button className={css.btn} onClick={() => onRegisterFinish()}>
                                    注册
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                )}
            </div>
        </div>
    )
}
