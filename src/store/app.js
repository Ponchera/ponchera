import { observable, action } from 'mobx'
import { APP_KEY, BASE_URL } from 'react-native-dotenv'
import io from 'socket.io-client'
import api from '../api'
import StorageService from '../services/storage'

class AppStore {
  @observable socket

  constructor() {
    this.initSocket()
  }

  initSocket = () => {
    const auth = await this.getState('auth')
    if (!auth || !auth.isAuthed) {
      // navigate('Login')
      return
    }
    this.socket = io(BASE_URL)
    this.socket.on('connect', () => {
      this.socket
        .emit('authenticate', { token: auth.token })
        .on('authenticated', () => {
          this.socket.on('message', (payloads) => {
            console.warn(payloads)
          })
        })
        .on('unauthorized', (err) => {
          console.warn(JSON.stringify(err.data))
          if (err.data.type === 'UnauthorizedError' || err.data.code === 'invalid_token') {
          }
        })
    })
  }

  @action
  getState = async (key) => {
    return await StorageService.get(key, null)
  }

  @action
  login = async (username, password) => {
    const res = await api.auth.login({
      username,
      password,
      key: APP_KEY,
    })
      .catch(() => {
      })
    const auth = {
      isAuthed: true,
      user: res.data.data,
      token: res.headers.authorization,
    }
    StorageService.set('auth', auth)
  }

  @action
  indexConversation = async () => {
    const res = await api.conversations.index()
      .catch(() => {
      })
    const conversations = res.data.data.items
    StorageService.set('conversations', conversations)
    return conversations
  }

  @action
  createConversation = async (type, members) => {
    const res = await api.conversations.create({ type, members })
      .catch(() => {
      })
    const conversation = res.data.data
    const conversations = await this.getState('conversations')
    const targetConversation = conversations
      .find(item => item.cid === conversation.cid)
    if (!targetConversation) {
      conversations = [conversation, ...conversations]
    }
    StorageService.set('conversations', conversations)
    return conversation
  }

  @action
  indexContact = async () => {
    const res = await api.contacts.index()
      .catch(() => {
      })
    const contacts = res.data.data.items
    StorageService.set('contacts', contacts)
    return contacts
  }

  @action
  sendMessage = (messages) => {
    this.socket.emit('message', messages)
  }
}

const appStore = new AppStore()

export { appStore }
