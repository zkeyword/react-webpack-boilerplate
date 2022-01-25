import { createAction } from 'redux-actions'

import { DouYin } from '@/app/reducers/baseReducer/baseReducer'
import baseServer from '@/app/services/baseServer'

export const login = data => createAction(DouYin.POST_LOGIN, () => baseServer.login(data))()
