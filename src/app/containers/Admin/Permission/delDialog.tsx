import './editDialog.styl'

import { Button, message, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { delUser } from '@/app/services/adminServer'

interface IProps {
    completed?(): void
}

interface IParams {
    id: number | null
}

export interface IDelDialog {
    show(params: IParams): void
    hide(params: IParams): void
    reset(params: IParams): void
}

export default forwardRef((props: IProps, ref) => {
    const [show, setShow] = useState(false)
    const [params, setParams] = useState<IParams>({
        id: null
    })
    const [loading, setLoading] = useState(false)
    const confirm = async (): Promise<void> => {
        setLoading(true)
        const res = await delUser(params.id)
        const data = res.data
        if (data?.code === -1) {
            message.destroy()
            message.error(data?.msg)
        } else {
            setShow(false)
            message.success('修改成功')
            if (props.completed) {
                props.completed()
            }
        }
        setLoading(false)
    }

    useImperativeHandle(ref, () => ({
        show: (params: IParams) => {
            setShow(true)
            setParams(params)
        },
        hide: async (params: IParams) => {
            if (params) {
                setParams(params)
            }
            setShow(false)
        },
        reset: async (params: IParams) => {
            setParams(params)
        }
    }))

    return (
        <Modal visible={show} onCancel={() => setShow(false)} footer={null} wrapClassName="delDialog" centered width={380} destroyOnClose={true}>
            <div>确认删除该用户？</div>
            <Button loading={loading} onClick={() => confirm()}>
                提交
            </Button>
        </Modal>
    )
})
