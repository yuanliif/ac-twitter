import { apiHelper } from '@/utils/helpers'

export default {
  get () {
    return apiHelper.get('/tweets')
  },
  post ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  like ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unlike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
