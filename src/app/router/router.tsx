import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from '../containers/Home'
import NotFound from '../containers/NotFound'
import SystemRouter from './systemRouter'

const Loading = (): JSX.Element => {
    return (
        <div className="lt-spin">
            <Spin size="large" tip="加载中..." />
        </div>
    )
}

export default (): JSX.Element => {
    return (
        <Suspense fallback={<Loading />}>
            <SystemRouter />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Suspense>
    )
}
