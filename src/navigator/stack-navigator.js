// import { StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import TabNavigator from './tab-navigator'
// import ConversationDetail from '../views/conversation/conversation-detail'
// import ContactDetail from '../views/conversation/contact-detail'
import Login from '../views/login'

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
    // ConversationDetail: {
    //   screen: ConversationDetail,
    // },
    // ContactDetail: {
    //   screen: ContactDetail,
    // },
    Login: {
      screen: Login,
    },
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
