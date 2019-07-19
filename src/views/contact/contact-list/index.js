import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { observer, inject } from 'mobx-react'

@inject(['appStore'])
@observer
export default class Contact extends Component {

  static navigationOptions = {
    headerTitle: '通讯录',
    tabBarLabel: '通讯录',
    tabBarIcon: ({ focused, tintColor }) => (
      <Icon name="contacts" size="md" color={tintColor} />
    ),
  }

  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  async componentDidMount() {
    const { indexContact } = this.props.appStore

    const contacts = await indexContact()
    this.setState({
      contacts
    })
  }

  render() {
    return (
      <View>
        {
          this.state.contacts.map((contact) => {
            return <Text key={contact}>{contact}</Text>
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
