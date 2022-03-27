import { lazy } from 'react'

const Login = lazy(() => import(/*webpackChunkName: 'Login'*/ /* webpackPrefetch: true */ '../containers/Login'))
const User = lazy(() => import(/*webpackChunkName: 'User'*/ /* webpackPrefetch: true */ '../containers/Admin/User'))
const Role = lazy(() => import(/*webpackChunkName: 'Role'*/ /* webpackPrefetch: true */ '../containers/Admin/Role'))
const Permission = lazy(() => import(/*webpackChunkName: 'Permission'*/ /* webpackPrefetch: true */ '../containers/Admin/Permission'))
const Other = lazy(() => import(/*webpackChunkName: 'OtherList'*/ /* webpackPrefetch: true */ '../containers/Admin/OtherList'))

const menuData = [
    {
        name: '登录',
        key: 'Login',
        router: '/login/',
        component: Login
    },
    {
        name: '用户列表',
        key: 'UserList',
        router: '/userList/',
        component: User,
        exact: true
    },
    {
        name: '角色列表',
        key: 'RoleList',
        router: '/roleList/',
        component: Role
    },
    {
        name: '权限列表',
        key: 'Permission',
        router: '/permission/',
        component: Permission
    },
    {
        name: '其他设置',
        key: 'Other',
        router: '/other/',
        component: Other
    }
]

export default menuData
