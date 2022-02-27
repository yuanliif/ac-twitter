import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

// swagger
const baseURL = 'https://virtserver.swaggerhub.com/HUANG-SIH-MAN/twitter-API/1.0.0/api'

const axiosInstance = axios.create({
  baseURL
})

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

// 依時間排序，時間近的在前面
export const sortByTime = function (arr, key) {
  return arr.sort((firstEl, secondEl) => moment(secondEl[key]).valueOf() - moment(firstEl[key]).valueOf())
}
