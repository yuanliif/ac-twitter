import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { API_URL } from '@/configs/api'

const axiosInstance = axios.create({
  baseURL: API_URL
})
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

// 依時間排序，時間近的在前面
export const sortByTime = function (arr, key = 'createdAt') {
  return arr.sort((firstEl, secondEl) => moment(secondEl[key]).valueOf() - moment(firstEl[key]).valueOf())
}
