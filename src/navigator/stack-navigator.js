import React from 'react'
// import { StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import TabNavigator from './tab-navigator'
// import Login from '../views/login'

export default createStackNavigator(
  {

    TabNavigator: {
      screen: TabNavigator,
      // navigationOptions: {
      //     header: () => {
      //         return <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={true} />
      //     }
      // },
    },
    // Login : {
    //     screen : Login,
    // },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'TabNavigator',
    mode: 'modal',
    defaultNavigationOptions: {
      header: null
    },
  }
)
