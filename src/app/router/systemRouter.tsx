import Loader from '../components/Loader'

// https://www.jianshu.com/p/d2152789759d webpackPrefetch
const Login = Loader(import(/*webpackChunkName: 'Login'*/ /* webpackPrefetch: true */ '../containers/Login'))
const Register = Loader(import(/*webpackChunkName: 'Register'*/ /* webpackPrefetch: true */ '../containers/Register'))
const User = Loader(import(/*webpackChunkName: 'Register'*/ /* webpackPrefetch: true */ '../containers/Admin/User'))
const Role = Loader(import(/*webpackChunkName: 'Register'*/ /* webpackPrefetch: true */ '../containers/Admin/Role'))

const menuData = [
    {
        name: '登录',
        key: 'Login',
        router: '/login/',
        component: Login
    },
    {
        name: '注册',
        key: 'Register',
        router: '/register/',
        component: Register
    },
    {
        name: '用户列表',
        key: 'UserList',
        router: '/userList/',
        component: User
    },
    {
        name: '角色列表',
        key: 'RoleList',
        router: '/roleList/',
        component: Role
    }
]

export default menuData
