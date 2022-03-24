import classnames from 'classnames'
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'

import style from './nav.module.styl'

const Nav: React.FC = (): React.ReactElement => {
    const history = useHistory()
    return (
        <div className={style.nav}>
            <div>功能管理</div>
            <div>
                <div>文章列表</div>
                <div>文章列表</div>
                <div>文章列表</div>
                <div>文章列表</div>
            </div>
            <div>系统管理</div>
            <div>
                <div>
                    <Link to={'/userList'}>用户列表</Link>
                </div>
                <div>
                    <Link to={'/roleList'}>角色列表</Link>
                </div>
                <div>
                    <Link to={'/permission'}>权限列表</Link>
                </div>
                <div>
                    <Link to={'/other'}>其他设置</Link>
                </div>
            </div>
        </div>
    )
}

export default Nav
