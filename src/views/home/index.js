import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'

@inject(['appStore'])
@observer
export default class Home extends Component {

  static navigationOptions = {
    headerTitle: '消息',
    tabBarLabel: '消息',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="message" size="md" color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { auth, indexConversation } = this.props.appStore
    const { navigate } = this.props.navigation

    if (!auth || !auth.isAuthed) {
      navigate('Login')
      return
    }
    indexConversation()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>消息</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
