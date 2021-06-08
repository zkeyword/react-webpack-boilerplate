import { request } from '../../utils/request'
import { AxiosResponse } from 'axios'

export type IAdmin = IContent<string>

// userList
export function userList(data): Promise<AxiosResponse<IAdmin>> {
    return request(`/user`, {
        method: 'GET',
        params: {
            ...data
        }
    })
}
