import { Form, Input, Table, Tree } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AdminLayout from '@/app/components/Layout/AdminLayout'
import { getPermissionTreeByID, IAdminUserList } from '@/app/services/adminServer'

import AddDialog, { IAddDialog } from './addDialog'
import DelDialog, { IDelDialog } from './delDialog'
import EditDialog, { IEditDialog } from './editDialog'
import useList, { ColumnType } from './hook/useList'
import css from './list.module.styl'

export default (): JSX.Element => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [treeData, setTreeData] = useState<any>([])
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info)
    }

    const onCheck = (checkedKeys: React.Key[], info: any) => {
        console.log('onCheck', checkedKeys, info)
    }

    useEffect(() => {
        const fetch = async (): Promise<void> => {
            const res = await getPermissionTreeByID(1)
            setTreeData(res.data.data)
        }
        fetch()
    }, [])

    return (
        <AdminLayout className={css.pageList} name="权限列表">
            <Tree
                defaultExpandAll={true}
                checkable
                // onSelect={onSelect}
                // onCheck={onCheck}
                treeData={treeData}
            />
        </AdminLayout>
    )
}
