import { createAction } from 'redux-actions'
import adminServer from '../../services/adminServer'
import { Admin } from '../../reducers/adminReducer/adminReducer'

export const userList = data => createAction(Admin.USER_LIST, () => adminServer.userList(data))()
