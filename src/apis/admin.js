import { apiHelper } from './../utils/helpers'

export default {
  getTweets () {
    return apiHelper.get('/admin/tweets', {
      // headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteTweet ({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
      // headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUsers () {
    return apiHelper.get('/admin/users', {
      // headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getCurrentUser () {
    return apiHelper.get('/users/current_user', {
      // headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
