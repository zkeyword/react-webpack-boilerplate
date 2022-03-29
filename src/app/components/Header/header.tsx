import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './header.module.styl'

interface IProps {
    type?: string[]
    systemName?: string
    children?: JSX.Element[] | JSX.Element
}

const Header: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
    const navigate = useNavigate()
    return (
        <header className={style.header}>
            <div className={style.logo} onClick={() => navigate('/')} />
            {props.children}
        </header>
    )
}

export default Header
