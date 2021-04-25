import { stringify } from 'query-string'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import './header.styl'

interface IProps extends RouteComponentProps {
    type?: string[]
    systemName?: string
    children: JSX.Element[] | JSX.Element
}

const Header: React.FunctionComponent<IProps> = (props: IProps): React.ReactElement => {
    const jump = (target: string): void => {
        props.history.push(target)
    }
    return (
        <header className="lt-header">
            <div className="logo" onClick={() => jump('/')}></div>
            {props.children}
        </header>
    )
}

export default withRouter(Header)
