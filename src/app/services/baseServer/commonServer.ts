import { AxiosResponse } from 'axios'

import { request } from '@/app/utils/request'

export interface IGetAuthorSales {
    errCode: number
    errMsg: string
}

export type ILogin = IContent<string>

// 登录帐号
export function login(data): Promise<AxiosResponse<ILogin>> {
    return request('/login', {
        method: 'POST',
        data
    })
}

// 注册帐号
export function register(data): Promise<AxiosResponse<ILogin>> {
    return request(`/register`, {
        method: 'POST',
        data
    })
}

// 验证码 该链接需要取headers信息中的captcha-id回传给服务端
export function captcha(): Promise<AxiosResponse<Blob>> {
    return request('/captcha', {
        method: 'GET',
        responseType: 'blob'
    })
}
