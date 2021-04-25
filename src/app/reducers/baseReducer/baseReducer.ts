import produce from 'immer'
import { errorHandle } from '../../utils'

import { IGetAuthorSales } from '../../services/baseServer/douYinServer'

export enum DouYin {
    GET_AUTHOR_SALES = 'GET_AUTHOR_SALES'
}

export interface IDouYinState {
    authorSales: IGetAuthorSales
}

export const douYinState: IDouYinState = {
    authorSales: {} as IGetAuthorSales
}

export default {
    [DouYin.GET_AUTHOR_SALES]: {
        next: produce((draft: IDouYinState, action: IAction) => {
            draft.authorSales = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    }
}
