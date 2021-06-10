import { useState, useEffect, useCallback } from 'react'
import { message } from 'antd'
import { IAdminUserList, IAdminUserItem, getUserList } from '../../../../services/adminServer/adminServer'
import { ColumnProps } from 'antd/lib/table'

type Dispatch<A> = (form: A) => void
type Form = { page: number; pageSize: number; username?: string }

export type ColumnType = ColumnProps<IAdminUserItem>[]

export default function useList(): [boolean, IAdminUserList | undefined, Dispatch<{ page: number; pageSize: number; username?: string }>] {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IAdminUserList>()
    const [form, setForm] = useState<Form | undefined>()

    const getList = (form: Form, isForced?: boolean): void => {
        setForm(form)
    }

    useEffect(() => {
        if (!form?.page) return
        const load = async (): Promise<void> => {
            setLoading(true)
            const res = await getUserList(form)
            const data = res.data
            if (data?.code === -1) {
                message.destroy()
                message.error(data?.msg)
            } else {
                setResponse(data)
            }
            setLoading(false)
        }
        load()
    }, [form])

    return [loading, response, getList]
}
