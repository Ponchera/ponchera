import HttpService from '../services/http'

export default {
  // 添加聊天
  create(data) {
    return HttpService.post('v1/conversations', data)
  },
  // 查询聊天列表
  index(data) {
    return HttpService.get('v1/conversations', data)
  },
}
