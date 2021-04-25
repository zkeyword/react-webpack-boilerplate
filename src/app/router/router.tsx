// import storage from '../utils/storage'
import * as React from 'react'
// import { useEffect, useState } from 'react'
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router'
import systemRouter from './systemRouter'
import Home from '../containers/Home'
import NotFound from '../containers/NotFound'

const AppRoute = (props: RouteComponentProps) => {
    // useEffect(() => {
    //     document.body.scrollTop = 0
    //     if (document.getElementsByClassName('.lt-right').length) {
    //         document.getElementsByClassName('.lt-right')[0].scrollTo(0, 0)
    //     }
    //     if (!storage.get('token') && props.location.pathname !== '/login') {
    //         props.history.push('/login')
    //     }
    // }, [window.location.href])

    return (
        <Switch>
            {systemRouter.map((r, key) => {
                return <Route render={() => <r.component />} key={r.router + key} path={r.router} />
            })}
            <Route exact={true} path="/" component={Home} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default withRouter(AppRoute)
