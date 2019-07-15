import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, InputItem, List } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'

@inject(['appStore'])
@observer
export default class Login extends Component {

  constructor(props) {
    super(props)
    this.store = this.props.appStore
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    const { login } = this.store
    return (
      <View>
        <List>
          <InputItem
            clear
            value={this.state.username}
            onChange={value => {
              this.setState({
                username: value,
              })
            }}
            placeholder="请输入用户名"
          >
            用户名
          </InputItem>
          <InputItem
            clear
            type="password"
            value={this.state.password}
            onChange={value => {
              this.setState({
                password: value,
              })
            }}
            placeholder="请输入密码"
          >
            密码
          </InputItem>
          <Button
            type="primary"
            onPress={() => {
              login(this.state.username, this.state.password)
                .then(() => {
                })
                .catch((err) => {
                  err.response && console.warn(err.response.data.message)
                })
            }}
          >
            登录
          </Button>
        </List>
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
