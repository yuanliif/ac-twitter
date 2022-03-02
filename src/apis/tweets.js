import { apiHelper } from '@/utils/helpers'

export default {
  get ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getAll () {
    return apiHelper.get('/tweets')
  },
  getReplies ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  post ({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  postReply ({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
  like ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unlike ({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
