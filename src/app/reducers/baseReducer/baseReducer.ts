import produce from 'immer'
import { errorHandle } from '../../utils'

import { IGetAuthorSales } from '../../services/baseServer/douYinServer'
import { ILogin } from '../../services/baseServer/commonServer'

export enum DouYin {
    POST_LOGIN = 'POST_LOGIN',
    GET_AUTHOR_SALES = 'GET_AUTHOR_SALES'
}

export interface IDouYinState {
    loginInfo: ILogin
    authorSales: IGetAuthorSales
}

export const douYinState: IDouYinState = {
    loginInfo: {} as ILogin,
    authorSales: {} as IGetAuthorSales
}

export default {
    [DouYin.POST_LOGIN]: {
        next: produce((draft: IDouYinState, action: IAction) => {
            draft.loginInfo = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    },
    [DouYin.GET_AUTHOR_SALES]: {
        next: produce((draft: IDouYinState, action: IAction) => {
            draft.authorSales = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    }
}
