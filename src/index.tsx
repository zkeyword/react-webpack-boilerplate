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
import { HashRouter } from 'react-router-dom'

import AppRouter from './app/router'
import store from './app/store'

render(
    <Web3ReactProvider
        getLibrary={provider => {
            const library = new Web3Provider(provider)
            library.pollingInterval = 5000
            return library
        }}
    >
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <HashRouter>
                    <AppRouter />
                </HashRouter>
            </Provider>
        </ConfigProvider>
    </Web3ReactProvider>,
    document.getElementById('root')
)
