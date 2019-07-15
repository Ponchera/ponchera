import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

export default class Contact extends Component {

  static navigationOptions = {
    headerTitle: '通讯录',
    tabBarLabel: '通讯录',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="contacts" size="md" color={tintColor} />
    ),
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>通讯录</Text>
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
