import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

export default class Home extends Component {

  static navigationOptions = {
    headerTitle: '消息',
    tabBarLabel: '消息',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="message" size="md" color={tintColor} />
    ),
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
