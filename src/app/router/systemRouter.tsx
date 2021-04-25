import Loader from '../components/Loader'

// https://www.jianshu.com/p/d2152789759d webpackPrefetch
const Login = Loader(import(/*webpackChunkName: 'Login'*/ /* webpackPrefetch: true */ '../containers/Login'))
const Register = Loader(import(/*webpackChunkName: 'Register'*/ /* webpackPrefetch: true */ '../containers/Register'))
const SWR = Loader(import(/*webpackChunkName: 'SWR'*/ /* webpackPrefetch: true */ '../containers/SWR'))

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
        name: '测试 SWR',
        key: 'SWR',
        router: '/swr/',
        component: SWR
    }
]

export default menuData
