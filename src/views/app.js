import React, { Component } from 'react'
import { createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import { Provider as AntProvider } from '@ant-design/react-native'
import StackNavigator from '../navigator/stack-navigator'
import store from '../store'
import NavigationService from '../services/navigation'

const Navigator = createAppContainer(StackNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <AntProvider>
          <Navigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
          />
        </AntProvider>
      </Provider>
    )
  }
}
