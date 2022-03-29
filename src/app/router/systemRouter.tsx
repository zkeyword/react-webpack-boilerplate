import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Login = lazy(() => import(/*webpackChunkName: 'Login'*/ /* webpackPrefetch: true */ '../containers/Login'))
const User = lazy(() => import(/*webpackChunkName: 'User'*/ /* webpackPrefetch: true */ '../containers/Admin/User'))
const Role = lazy(() => import(/*webpackChunkName: 'Role'*/ /* webpackPrefetch: true */ '../containers/Admin/Role'))
const Permission = lazy(() => import(/*webpackChunkName: 'Permission'*/ /* webpackPrefetch: true */ '../containers/Admin/Permission'))
const Other = lazy(() => import(/*webpackChunkName: 'OtherList'*/ /* webpackPrefetch: true */ '../containers/Admin/OtherList'))

const sysRouter = (): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null => {
    const routes = useRoutes([
        {
            path: '/login/',
            element: <Login />
        },
        {
            path: '/userList/',
            element: <User />
        },
        {
            path: '/roleList/',
            element: <Role />
        },
        {
            path: '/permission/',
            element: <Permission />
        },
        {
            path: '/other/',
            element: <Other />
        }
    ])

    return routes
}

export default sysRouter
