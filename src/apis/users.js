import { apiHelper } from '@/utils/helpers'

export default {
  getUserData ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUserSetting ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/account`, formData)
  }
}
