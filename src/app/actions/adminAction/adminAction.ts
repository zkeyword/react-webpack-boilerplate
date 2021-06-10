import { createAction } from 'redux-actions'
import adminServer from '../../services/adminServer'
import { Admin } from '../../reducers/adminReducer/adminReducer'

export const getUserList = data => createAction(Admin.USER_LIST, () => adminServer.getUserList(data))()
