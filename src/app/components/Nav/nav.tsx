import classnames from 'classnames'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import style from './nav.module.styl'

const Nav: React.FC = (): React.ReactElement => {
    const navigate = useNavigate()
    return (
        <div className={style.nav}>
            <div className={style.logo}>系统管理</div>
            <div className={style.main}>
                <div className={style.navItem}>功能管理</div>
                <div className={style.subNav}>
                    <div className={style.subNavItem}>文章列表</div>
                    <div className={style.subNavItem}>文章列表</div>
                    <div className={style.subNavItem}>文章列表</div>
                    <div className={style.subNavItem}>文章列表</div>
                </div>
                <div className={style.navItem}>系统管理</div>
                <div className={style.subNav}>
                    <div className={style.subNavItem}>
                        <Link to={'/userList'}>用户列表</Link>
                    </div>
                    <div className={style.subNavItem}>
                        <Link to={'/roleList'}>角色列表</Link>
                    </div>
                    <div className={style.subNavItem}>
                        <Link to={'/permission'}>权限列表</Link>
                    </div>
                    <div className={style.subNavItem}>
                        <Link to={'/other'}>其他设置</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
