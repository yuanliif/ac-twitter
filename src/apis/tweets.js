import { apiHelper } from '@/utils/helpers'

export default {
  like ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unlike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
