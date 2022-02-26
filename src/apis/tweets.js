import { apiHelper } from '@/utils/helpers'

export default {
  get () {
    return apiHelper.get('/tweets')
  },
  like ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unlike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
