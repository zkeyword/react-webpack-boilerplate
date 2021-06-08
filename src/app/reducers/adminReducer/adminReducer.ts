import produce from 'immer'
import { errorHandle } from '../../utils'
import { ILogin } from '../../services/baseServer/commonServer'

export enum Admin {
    USER_LIST = 'USER_LIST'
}

export interface IAdminState {
    loginInfo: ILogin
}

export const douYinState: IAdminState = {
    loginInfo: {} as ILogin
}

export default {
    [Admin.USER_LIST]: {
        next: produce((draft: IAdminState, action: IAction) => {
            draft.loginInfo = action.payload.data
        }),
        throw: (state, action) => errorHandle(state, action)
    }
}
