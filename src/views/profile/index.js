import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'

@inject(['appStore'])
@observer
export default class Profile extends Component {

  static navigationOptions = {
    headerTitle: '我',
    tabBarLabel: '我',
    tabBarIcon: ({focused, tintColor}) => (
      <Icon name="user" size="md" color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const { logout } = this.props.appStore

    await logout()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我</Text>
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
