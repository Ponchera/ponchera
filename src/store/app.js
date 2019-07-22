import { observable, action } from 'mobx'
import { APP_KEY, BASE_URL } from 'react-native-dotenv'
import io from 'socket.io-client'
import api from '../api'
import StorageService from '../services/storage'
import NavigationService from '../services/navigation'

class AppStore {
  @observable socket

  constructor() {
    this.init()
  }

  init = async () => {
    const isAuthed = await this.checkAuth()
    if (!isAuthed) {
      return
    }
    this.initSocket()
  }

  checkAuth = async () => {
    const auth = await this.getState('auth')
    if (!auth || !auth.isAuthed) {
      NavigationService.navigate('Login')
      return false
    }
    return true
  }

  initSocket = async () => {
    this.socket = io(BASE_URL)
    this.socket.on('connect', async () => {
      const auth = await this.getState('auth')
      this.socket
        .emit('authenticate', { token: auth.token })
        .on('authenticated', () => {
          this.socket.on('message', (payloads) => {
            console.warn(payloads)
          })
        })
        .on('unauthorized', (err) => {
          if (err.data.type === 'UnauthorizedError' || err.data.code === 'invalid_token') {
            this.initSocket()
          }
        })
    })
  }

  @action
  getState = async (key) => {
    return await StorageService.get(key, null)
  }

  @action
  logout = async () => {
    const auth = {
      isAuthed: false,
      user: {},
      token: '',
    }
    StorageService.set('auth', auth)
    NavigationService.navigate('Login')
  }

  @action
  login = async (username, password) => {
    let res
    try {
      res = await api.auth.login({
        username,
        password,
        key: APP_KEY,
      })
    } catch {
      return
    }

    const auth = {
      isAuthed: true,
      user: res.data.data,
      token: res.headers.authorization,
    }
    StorageService.set('auth', auth)
    NavigationService.navigate('TabNavigator')
  }

  @action
  indexConversation = async () => {
    let res
    try {
      res = await api.conversations.index()
    } catch {
      return await this.getState('conversations')
    }

    const conversations = res.data.data.items
    StorageService.set('conversations', conversations)
    return conversations
  }

  @action
  createConversation = async (type, members) => {
    let res
    try {
      res = await api.conversations.create({ type, members })
    } catch {
      return
    }

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
    let res
    try {
      res = await api.contacts.index()
    } catch {
      return await this.getState('contacts')
    }

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
