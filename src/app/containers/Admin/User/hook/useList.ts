import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import adminAction from '../../../../actions/adminAction'
import { IAdminUserList, IAdminUserItem } from '../../../../services/adminServer/adminServer'
import { ColumnProps } from 'antd/lib/table'

type Dispatch<A> = (form: A) => void
type Form = { page: number; pageSize: number; username?: string }

export type ColumnType = ColumnProps<IAdminUserItem>[]

export default function useLogin(): [boolean, IAdminUserList | undefined, Dispatch<{ page: number; pageSize: number; username?: string }>] {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IAdminUserList>()
    const [form, setForm] = useState<Form | undefined>()

    const getList = useCallback(
        (form?: Form | undefined): void => {
            setForm(form)
        },
        [form]
    )

    useEffect(() => {
        if (!form?.page) return
        const load = async (): Promise<void> => {
            setLoading(true)
            const res = await dispatch(adminAction.userList(form))
            const data: IAdminUserList = (await res.payload)?.data
            if (data?.code === -1) {
                message.destroy()
                message.error(data?.msg)
            } else {
                setResponse(data)
            }
            setLoading(false)
            getList()
        }
        load()
    }, [form])

    return [loading, response, getList]
}
