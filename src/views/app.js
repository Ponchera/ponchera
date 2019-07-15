import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import StackNavigator from '../navigator/stack-navigator'
import store from '../store'

const Navigator = createAppContainer(StackNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <Navigator />
      </Provider>
    )
  }
}
