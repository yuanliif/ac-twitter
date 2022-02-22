import axios from 'axios'
import Swal from 'sweetalert2'

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
