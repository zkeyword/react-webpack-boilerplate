import { request } from '../../utils/request'
import { AxiosResponse } from 'axios'

export type IAdminUserItem = { id: number; username: string }
export type IAdminUserList = IContent<IList<IAdminUserItem[]>>

// userList
export function userList(data): Promise<AxiosResponse<IAdminUserList>> {
    return request(`/user`, {
        method: 'GET',
        params: {
            ...data
        }
    })
}
