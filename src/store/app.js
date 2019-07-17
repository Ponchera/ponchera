import { observable, action } from 'mobx'
import { APP_KEY } from 'react-native-dotenv'
import api from '../api'
import StorageService from '../services/storage'

class AppStore {
  @observable socket
  @observable auth
  @observable conversations

  constructor() {
    this.socket = null
    this.auth = StorageService.get('auth', null)
    this.conversations = StorageService.get('conversations', null)
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

  @action
  indexConversation = () => {
    api.conversations.index()
      .then((res) => {
        this.conversations = res.data.data.items
        StorageService.set('conversations', this.conversations)
      })
      .catch(() => {
      })
  }

  @action
  createConversation = (type, members) => {
    return new Promise((resolve) => {
      api.conversations.create({ type, members })
        .then((res) => {
          const conversation = res.data.data
          const targetConversation = this.conversations
            .find(item => item.cid === conversation.cid)
          if (!targetConversation) {
            this.conversations = [conversation, ...this.conversations]
          }
          StorageService.set('conversations', this.conversations)
          resolve(conversation)
        })
        .catch(() => {
        })
    })
  }
}

const appStore = new AppStore()

export { appStore }
