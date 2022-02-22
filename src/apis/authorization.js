import { apiHelper } from './../utils/helpers'

export default {
  adminSignIn ({ account, password }) {
    return apiHelper.post('/admin/users/login', {
      account,
      password
    })
  }
}
