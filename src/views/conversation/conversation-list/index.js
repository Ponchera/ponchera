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
    this.state = {
      conversations: []
    }
  }

  async componentDidMount() {
    const { indexConversation } = this.props.appStore

    const conversations = await indexConversation()
    this.setState({
      conversations
    })
  }

  render() {
    return (
      <View>
        {
          this.state.conversations.map((conversation) => {
            return <Text key={conversation.cid}>{conversation.cid}</Text>
          })
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
