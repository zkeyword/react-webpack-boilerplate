import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import adminAction from '../../../../actions/adminAction'
import { IAdmin } from '../../../../services/adminServer/adminServer'

type Dispatch<A> = (form: A) => void
type Form = { username: string; password: string }

export default function useLogin(): [boolean, IAdmin | undefined, Dispatch<{ username: string; password: string }>] {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<IAdmin>()
    const [form, setForm] = useState<Form | undefined>()

    const getList = useCallback(
        (form?: Form | undefined): void => {
            setForm(form)
        },
        [form]
    )

    useEffect(() => {
        const load = async (): Promise<void> => {
            setLoading(true)
            const res = await dispatch(adminAction.userList(form))
            const data: IAdmin = (await res.payload)?.data
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
