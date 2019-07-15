import HttpService from '../services/http'

export default {
  // 登录
  login(data) {
    return HttpService.post('v1/auth/login', data)
  },
}
