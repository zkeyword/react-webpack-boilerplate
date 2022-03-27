import classnames from 'classnames'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

import storage from '@/app/utils/storage'

import Nav from '../Nav'
import style from './adminLayout.module.styl'

interface IProps {
    className?: string
    children: JSX.Element[] | JSX.Element
    name: string
}

const Layout: React.FC<IProps> = (props: IProps): React.ReactElement => {
    const { className, name } = props
    const history = useHistory()

    const onLogout = (): void => {
        storage.clear()
        history.push('/login')
    }

    return (
        <div className={classnames(style.layout, className)}>
            <Nav />
            <div className={style.wrap}>
                <div className={style.header}>
                    <div className={style.bar}>
                        <div />
                        <div className="" onClick={() => onLogout()}>
                            退出
                        </div>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.title}>{name}</div>
                    <div className={style.main}>{props.children}</div>
                </div>
                <div className={style.footer}>
                    <div className={style.copyright}>Copyright © {new Date().getFullYear()} zkeyword. All rights reserved.</div>
                    <a href="https://github.com/zkeyword/react-webpack-boilerplate" target="__blank">
                        react-webpack-boilerplate
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Layout
