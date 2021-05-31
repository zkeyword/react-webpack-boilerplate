import produce from 'immer'
import { errorHandle } from '../../utils'

import { IGetAuthorSales } from '../../services/baseServer/douYinServer'

export enum DouYin {
    POST_LOGIN = 'POST_LOGIN',
    GET_AUTHOR_SALES = 'GET_AUTHOR_SALES'
}

export interface IDouYinState {
    loginInfo: IGetAuthorSales
    authorSales: IGetAuthorSales
}

export const douYinState: IDouYinState = {
    loginInfo: {} as any,
    authorSales: {} as IGetAuthorSales
}

export default {
    [DouYin.POST_LOGIN]: {
        next: produce((draft: IDouYinState, action: IAction) => {
            console.log(action.payload)
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
