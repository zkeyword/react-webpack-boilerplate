import * as React from 'react'
import { useCallback, useRef, useState, memo, useMemo, useContext, useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { Skeleton, Avatar } from 'antd'
import classnames from 'classnames'
import * as qs from 'query-string'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Layout from '../../components/Layout'
import Header from '../../components/Header'
import { IRootState } from '../../reducers/RootState'
import baseAction from '../../actions/baseAction'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
// import Icon from '@ant-design/icons'
import SvgHome, { ReactComponent as SvgHome2 } from './img/home.svg'
import homeStyle from './home.module.styl'

const Btn = styled.div<{ primary: boolean; black: boolean }>`
    width: 200px;
    height: 200px;
    background: skyblue;
    display: flex;
    ${props => `color:${props.primary ? 'white' : 'red'}`};
    border: ${props => (props.black ? 'solid 3px black' : '')};
`
import './home.styl'

type IProps = RouteComponentProps

const ChildComp = ({ name, onClick, info }): JSX.Element => {
    console.log('render child-comp ...')
    return (
        <>
            <div>Child Comp ... {name}</div>
            <button onClick={() => onClick('hello')}>改变 name 值</button>
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
        console.log(buttonDom.current)
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
            <ChildC info={info} name={name} onClick={changeName} />
        </div>
    )
}

function Home(props: IProps): JSX.Element {
    const dispatch = useDispatch()
    const [t, i18n] = useTranslation()
    const { query } = qs.parseUrl(props.location.search)
    const { authorSales } = useSelector((store: IRootState) => store.base)
    const dayType = query.day_type === 'week' ? '周榜' : '日榜'
    const queryDay = query.day as string
    const dayArr = queryDay ? queryDay.split('-') : []
    const day = dayArr.length
        ? dayArr.length > 2
            ? dayjs(queryDay).format('MM/DD')
            : `${dayjs(dayArr[0]).format('MM/DD')}-${dayjs(dayArr[1]).format('MM/DD')}`
        : ''

    const [name, setName] = useState('username')
    const [nameError, setNameError] = useState(false)

    const handleFetch = useCallback(async () => {
        // await dispatch(baseAction.getAuthorSales(query))
        console.log(121212)
    }, [])

    useEffect(() => {
        handleFetch()
    }, [handleFetch])

    useEffect(() => {
        console.log(1111)
    }, [])

    const changLng = (l: string): void => {
        i18n.changeLanguage(l)
        props.history.replace(`?lng=${l}`)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
        setNameError(false)
        if (!value) {
            setNameError(true)
        }
    }

    const onSubmit = (): void => {
        console.log(111, name)
    }

    const data = { d: 'xx' }
    const d = { ...data }

    console.log(homeStyle, d)

    return (
        <Layout className={classnames('page-home')}>
            <Header>
                <div className="text" />
            </Header>

            <div className="lt-main">
                <div className={homeStyle.home}>
                    <div className={homeStyle.test}>xxxx</div>
                </div>
                <Btn primary black>
                    222222222222222
                </Btn>
                <div onClick={() => changLng('zh_CN')}>中文简体</div>
                <div onClick={() => changLng('en_US')}>English</div>
                {t('joinUsText')}
                <form noValidate autoComplete="off" onSubmit={() => onSubmit()}>
                    <TextField label="用户名" value={name} onChange={handleChange} error={nameError} />
                    <Button type="submit" className="btn">
                        发送
                    </Button>
                </form>

                <Child />

                <div className="ui-block">
                    <div className="header">
                        {day ? (
                            <div className="left">
                                {day} {dayType}
                            </div>
                        ) : null}
                    </div>

                    <img src={SvgHome} alt="" />
                    {/* <Icon component={SvgHome2} /> */}

                    <div className="list">
                        <div className="head">
                            <div className="column column_0"></div>
                            <div className="column column_1">达人</div>
                            <div className="column column_2">销量</div>
                            <div className="column column_3">销售额度</div>
                        </div>
                        <div className="body">
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
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Home)