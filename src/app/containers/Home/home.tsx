import { useWeb3React } from '@web3-react/core'
import { Avatar, Skeleton, Upload } from 'antd'
import classnames from 'classnames'
import dayjs from 'dayjs'
import * as qs from 'query-string'
import * as React from 'react'
import { memo, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import baseAction from '@/app/actions/baseAction'
import Header from '@/app/components/Header'
import Layout from '@/app/components/Layout'
import TradingView from '@/app/components/TradingView'
import { useHtml2Canvas } from '@/app/hooks/useHtmlCanvas'
import { IRootState } from '@/app/reducers/RootState'
import Icon from '@/assets/icons'

import homeStyle from './home.module.styl'
// import Icon from '@ant-design/icons'
import SvgHome from './img/home.svg'

const Btn = styled.div<{ primary: boolean; black: boolean }>`
    width: 200px;
    height: 200px;
    background: skyblue;
    display: flex;
    ${props => `color:${props.primary ? 'white' : 'red'}`};
    border: ${props => (props.black ? 'solid 3px black' : '')};
`
import './home.styl'

const ChildComp = ({ name, onClick }: { name: string; onClick(val: string): void }): JSX.Element => {
    console.log('render child-comp ...')
    return (
        <>
            <div>Child Comp ... {name}</div>
            <Icon name="close" />
            <button
                onClick={() => {
                    onClick('hello')
                }}
            >
                改变 name 值
            </button>
        </>
    )
}
const ChildC = memo(ChildComp)

function Child(): JSX.Element {
    const timerID = useRef<number>()
    const buttonDom = useRef<HTMLButtonElement>(null)
    const [name, setName] = useState('hi~')
    const [age, setAge] = useState('hi~')
    const [count, setCount] = useState(0)
    const increment = () => setCount(count + 1)
    // 每次父组件渲染，返回的是同一个函数引用
    // const changeName = useCallback((newName) => setName(newName), [])
    const changeName = (newName: string) => setName(newName)
    // const info = useMemo(() => ({ name, age }), [name, age])   // 包一层
    const info = { name, age } // 重新生成一个新对象，导致传递给子组件的 info 属性值变化，进而导致子组件重新渲染。

    useEffect(() => {
        timerID.current = Number(
            setInterval(() => {
                setCount(c => c + 1)
            }, 1000)
        )
        return () => {
            clearInterval(Number(timerID.current))
        }
    }, [])

    useEffect(() => {
        if (count > 10) {
            clearInterval(Number(timerID.current))
        }
    }, [count])

    return (
        <div>
            <button ref={buttonDom} onClick={increment}>
                点击次数：{count}
            </button>
            <ChildC name={name} onClick={changeName} />
        </div>
    )
}

function Home(): JSX.Element {
    const navigate = useNavigate()
    const { search } = useLocation()
    const [t, i18n] = useTranslation()
    const { query } = qs.parseUrl(search)
    const dayType = query.day_type === 'week' ? '周榜' : '日榜'
    const queryDay = query.day as string
    const dayArr = queryDay ? queryDay.split('-') : []
    const day = dayArr.length
        ? dayArr.length > 2
            ? dayjs(queryDay).format('MM/DD')
            : `${dayjs(dayArr[0]).format('MM/DD')}-${dayjs(dayArr[1]).format('MM/DD')}`
        : ''

    const changLng = (l: string): void => {
        i18n.changeLanguage(l)
        navigate(`?lng=${l}`, { replace: true })
    }

    const uploadConfig = {
        name: 'file',
        action: 'http://0.0.0.0:9000/upload',
        onChange(info) {
            console.log(info)
        }
    }

    const { account } = useWeb3React()
    console.log(account)

    const { onRender, imgSrc } = useHtml2Canvas()
    const sharePosterRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (sharePosterRef.current) {
            onRender(sharePosterRef.current)
        }
    }, [onRender])

    return (
        <Layout className={classnames('page-home')}>
            <Header>
                <div className="text" />
            </Header>

            <div className="lt-main">
                <div className={homeStyle.home}>
                    <div className={homeStyle.test}>xxxx</div>
                </div>
                <Btn primary black ref={sharePosterRef}>
                    222222222222222
                </Btn>
                <div onClick={() => changLng('zh_CN')}>中文简体</div>
                <div onClick={() => changLng('en_US')}>English</div>
                {t('joinUsText')}
                {/* <form noValidate autoComplete="off" onSubmit={() => onSubmit()}>
                    <TextField label="用户名" value={name} onChange={handleChange} error={nameError} />
                    <Button type="submit" className="btn">
                        发送
                    </Button>
                </form> */}

                <Child />
                <img src={SvgHome} alt="" />

                <div className="ui-block">
                    <div className="header">
                        {day ? (
                            <div className="left">
                                {day} {dayType}
                            </div>
                        ) : null}
                    </div>
                    <div className="list">
                        <div className="head">
                            <div className="column column_0" />
                            <div className="column column_1">达人</div>
                            <div className="column column_2">销量</div>
                            <div className="column column_3">销售额度</div>
                        </div>
                        {/* <div className="body">
                            {!authorSales.data
                                ? new Array(10)
                                      .fill('1')
                                      .map((item, index) => <Skeleton key={index} avatar active paragraph={{ rows: 0 }} title={{ width: '100%' }} />)
                                : authorSales.data.list.map(item => (
                                      <div className="item" key={item.id}>
                                          <div className="column column_0">
                                              <Avatar src={item.avatar} />
                                          </div>
                                          <div className="column column_1">{item.nickname}</div>
                                          <div className="column column_2">{item.sales}</div>
                                          <div className="column column_3">{item.sales_volume}</div>
                                      </div>
                                  ))}
                        </div> */}
                    </div>
                </div>

                <img src={imgSrc} alt="" />

                <TradingView />

                <Upload {...uploadConfig}>
                    <div>Click to Upload</div>
                </Upload>
            </div>
        </Layout>
    )
}

export default Home
