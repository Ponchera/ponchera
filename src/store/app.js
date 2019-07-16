import { observable, action } from 'mobx'
import { APP_KEY } from 'react-native-dotenv'
import api from '../api'
import StorageService from '../services/storage'

class AppStore {
  @observable socket
  @observable auth

  constructor() {
    this.socket = null
    this.auth = StorageService.get('auth', null)
  }

  @action
  login = (username, password) => {
    return new Promise((resolve) => {
      api.auth.login({
        username,
        password,
        key: APP_KEY,
      })
        .then((res) => {
          const auth = {
            isAuthed: true,
            user: res.data.data,
            token: res.headers.authorization,
          }
          this.auth = auth
          StorageService.set('auth', auth)
          resolve()
        })
        .catch(() => {
        })
    })
  }
}

const appStore = new AppStore()

export { appStore }
