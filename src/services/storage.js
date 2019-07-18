import { AsyncStorage } from 'react-native'

export default class Storage {
  static async get(key, defaultValue) {
    let stored
    try {
      stored = await AsyncStorage.getItem(key)
      stored = JSON.parse(stored)
    } catch (err) {
      stored = null
    }
    if (defaultValue && stored === null) {
      stored = defaultValue
    }
    return stored
  }

  static set(key, value) {
    if (value) {
      AsyncStorage.setItem(key, JSON.stringify(value))
    }
  }

  static remove(key) {
    AsyncStorage.removeItem(key)
  }

  static clear() {
    AsyncStorage.clear()
  }
}
