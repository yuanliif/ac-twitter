import { apiHelper } from './../utils/helpers'

export default {
  userSignUp (data) {
    return apiHelper.post('/users', {
      ...data
    })
  },
  userSignIn ({ account, password }) {
    return apiHelper.post('/users/login', {
      account,
      password
    })
  },
  adminSignIn ({ account, password }) {
    return apiHelper.post('/admin/users/login', {
      account,
      password
    })
  }
}
