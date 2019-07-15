import axios from 'axios'
import { APP_KEY, BASE_URL } from 'react-native-dotenv'

const tip = msg => {
  // 提示错误
}

const toLogin = () => {
  // 返回登录页
}

let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 60 * 2,
})

instance.interceptors.request.use(
  request => {
    const token = ''
    token && (request.headers.Authorization = token)
    return request
  },
  err => Promise.reject(err)
)

instance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {
      // 提示错误信息
    } else {
      // 设置应用为断网状态
    }
    return Promise.reject(err)
  }
)

export default instance
