import { apiHelper } from '@/utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getUserData ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUserSetting ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/account`, formData)
  },
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  }
}
