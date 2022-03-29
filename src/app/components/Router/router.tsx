import { Button, Result } from 'antd'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router'

import { IRootState } from '@/app/reducers/RootState'
import authRender from '@/app/utils/auth'
import flatData from '@/app/utils/flatData'

import Layout from '../Layout'

interface IData {
    [key: string]: string | unknown
}

interface IProps extends RouteComponentProps {
    navData?: IData[]
    routerData: IData[]
    systemName: string
    type?: string[]
}

function handleRouter(routerData) {
    return flatData(routerData).reverse() // router 顺序会影响页面调用是否正确，例如：角色管理和角色权限管理
}

function handleKey(router) {
    const tmp = router
        .split(':')[0]
        .split('/')
        .filter(item => item)
    return tmp.join('_')
}

function Router(props: IProps) {
    const { routerData, navData, systemName, type } = props
    const routes = handleRouter(routerData)
    const { userInfo } = useSelector((store: IRootState) => store.basic)
    const [isSuperman, setSuperman] = useState(false)

    const ResultTip = () => {
        return (
            <Result
                status="403"
                title="权限不足请联系管理员"
                subTitle="对不起您的权限不足，请联系管理员"
                extra={
                    <Button type="primary" onClick={() => props.history.push('/')}>
                        Back Home
                    </Button>
                }
            />
        )
    }

    useEffect(() => {
        if (userInfo.roles && userInfo.roles.length) {
            userInfo.roles.map(item => {
                if (item === 'superman') {
                    setSuperman(true)
                }
            })
        }
        return () => setSuperman(false)
    }, [userInfo])

    return (
        <Layout systemName={systemName} navData={navData || routerData} type={type}>
            <Switch>
                {routes.map((item, key) => {
                    return (
                        item.component && (
                            <Route
                                render={p => {
                                    const c = authRender([<item.component key={handleKey(item.router)} {...p} />], isSuperman)
                                    return c.length ? c : ResultTip()
                                }}
                                key={item.router + key}
                                path={item.router}
                            />
                        )
                    )
                })}
                <Route render={() => ResultTip()} />
            </Switch>
        </Layout>
    )
}

export default withRouter(Router)
