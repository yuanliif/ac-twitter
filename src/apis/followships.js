import { apiHelper } from '@/utils/helpers'

export default {
  follow ({ userId }) {
    return apiHelper.post('/followships', { id: userId })
  },
  unfollow ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  },
  getTopUsers () {
    return apiHelper.get('/followships/top10')
  }
}
