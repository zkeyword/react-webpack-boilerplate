import 'dayjs/locale/zh-cn'
import './assets/stylus/index.styl'
import './app/utils/i18n'

import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import AppRouter from './app/router'
import store, { history } from './app/store'

function getLibrary(provider: any) {
    const library = new Web3Provider(provider)
    library.pollingInterval = 5000
    return library
}

render(
    <Web3ReactProvider getLibrary={getLibrary}>
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <Router history={history}>
                    <AppRouter />
                </Router>
            </Provider>
        </ConfigProvider>
    </Web3ReactProvider>,
    document.getElementById('root')
)

// if (module.hot) {
//     module.hot.accept(['./app/router'], () => {
//         render(
//             <ConfigProvider locale={zhCN}>
//                 <Provider store={store}>
//                     <Router history={history}>
//                         <AppRouter />
//                     </Router>
//                 </Provider>
//             </ConfigProvider>,
//             document.getElementById('root')
//         )
//     })
// }
