import { apiHelper } from '@/utils/helpers'

export default {
  getCurrentUser () {
    return apiHelper.get('/users/current_user')
  },
  getUserData ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUserProfile ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  updateUserSetting ({ userId, account, name, email, password }) {
    return apiHelper.put(`/users/${userId}/account`, { account, name, email, password })
  },
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  }
}
