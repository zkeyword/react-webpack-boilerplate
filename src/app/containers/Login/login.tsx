import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import basicAction from '../../actions/baseAction'
import { IRootState } from '../../reducers/RootState'
import './login.styl'

function Login(): JSX.Element {
    const [username, setUserName] = useState<undefined | string>('')
    const [usernameError, setUserNameError] = useState(false)
    const [password, setPassword] = useState<undefined | string>('')
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()
    const { loginInfo } = useSelector((store: IRootState) => store.base)

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setUserName(value)
        setUserNameError(false)
        if (!value) {
            setUserNameError(true)
        }
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setPassword(value)
        setPasswordError(false)
        if (!value) {
            setPasswordError(true)
        }
    }

    const onSubmit = async (): Promise<void> => {
        if (!username) return setUserNameError(true)
        if (!password) return setPasswordError(true)
        await dispatch(basicAction.login({ username, password }))
        console.log(loginInfo)
    }

    return (
        <Layout>
            <div className="login">
                <form noValidate autoComplete="off">
                    <div>
                        <TextField label="用户名" value={username} onChange={handleUserNameChange} error={usernameError} />
                    </div>
                    <div>
                        <TextField type="password" label="密码" value={password} onChange={handlePasswordChange} error={passwordError} />
                    </div>
                    <Button className="btn" onClick={() => onSubmit()}>
                        登录
                    </Button>
                    <Button className="btn">注册</Button>
                </form>
            </div>
        </Layout>
    )
}

export default withRouter(Login)
