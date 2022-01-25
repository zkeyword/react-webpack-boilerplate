import { createAction } from 'redux-actions'

import { Admin } from '@/app/reducers/adminReducer/adminReducer'
import * as adminServer from '@/app/services/adminServer'

export const getUserList = data => createAction(Admin.USER_LIST, () => adminServer.getUserList(data))()
