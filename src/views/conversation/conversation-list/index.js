import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'

@inject(['appStore'])
@observer
export default class Conversation extends Component {

  static navigationOptions = {
    headerTitle: '聊天',
    tabBarLabel: '聊天',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="message" size="md" color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { getAuth, indexConversation } = this.props.appStore
    const { navigate } = this.props.navigation

    const auth = await getAuth()
    if (!auth || !auth.isAuthed) {
      navigate('Login')
      return
    }
    indexConversation()
  }

  render() {
    const { conversations } = this.props.appStore

    return (
      <View>
        {
          conversations
            ? (
              conversations.map((conversation) => {
                return <Text key={conversation.cid}>{conversation.cid}</Text>
              })
            ) : (
              <Text></Text>
            )
        }
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
