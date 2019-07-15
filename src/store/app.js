import { observable, action } from 'mobx'
import { APP_KEY, BASE_URL } from 'react-native-dotenv'
import api from '../api'

class AppStore {
  @observable socket
  @observable auth

  constructor() {
    this.socket = null
    this.auth = null
  }

  @action
  login = (username, password) => {
    return new Promise((resolve, reject) => {
      api.auth.login({
        username,
        password,
        key: APP_KEY,
      })
        .then(({ data, headers }) => {
          this.auth = { user: data, token: headers.Authorization }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const appStore = new AppStore()

export { appStore }
