import axios from 'axios'
import { observable, action } from 'mobx'
import { APP_KEY, BASE_URL } from 'react-native-dotenv'

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
      axios.post(`${BASE_URL}v1/auth/login`, {
        username,
        password,
        key: APP_KEY,
      })
        .then(({ data, headers }) => {
          this.auth = { user: data, token: headers.authorization }
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
