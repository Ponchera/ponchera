import axios from 'axios'
import { BASE_URL, API_PREFIX } from 'react-native-dotenv'
import { Toast } from '@ant-design/react-native'
import storageService from './storage'
import NavigationService from './navigation'

const tip = msg => {
  Toast.info(msg)
}

const toLogin = () => {
  NavigationService.navigate('Login')
}

let instance = axios.create({
  baseURL: API_PREFIX ? `${BASE_URL}${API_PREFIX}/` : BASE_URL,
  timeout: 1000 * 60 * 2,
})

instance.interceptors.request.use((request) => {
  // 若用户已登录，则给请求头中带上令牌
  const auth = storageService.get('auth', null)
  if (auth && auth.isAuthed) {
    request.headers['Authorization'] = auth.token
  }
  return request
}, (err) => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  // 判断响应中是否有令牌，如果有就替换掉本地的
  const token = response.headers.authorization
  if (token) {
    let auth = storageService.get('auth', null)
    if (auth && auth.isAuthed) {
      auth.token = token
      storageService.set('auth', auth)
    }
  }
  return response
}, (err) => {
  if (err.response) {
    switch (err.response.status) {
      case 401:
        tip(err.response.data.message)
        toLogin()
        break
      default:
        tip(err.response.data.message)
        break
    }
  } else {
    // 提示错误或者直接认为应用为断网状态
    tip(err.message)
  }
  return Promise.reject(err)
})

export default instance
