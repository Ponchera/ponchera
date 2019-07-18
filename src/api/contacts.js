import HttpService from '../services/http'

export default {
  // 查询联系人列表
  index(data) {
    return HttpService.get('v1/contacts', data)
  },
}
