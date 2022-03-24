import classnames from 'classnames'
import * as React from 'react'

import Nav from '../Nav'
import style from './adminLayout.module.styl'

interface IProps {
    className?: string
    children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<IProps> = (props: IProps): React.ReactElement => {
    const { className } = props

    return (
        <div className={classnames(style.layout, className)}>
            <Nav />
            <div className={style.content}>{props.children}</div>
        </div>
    )
}

export default Layout
