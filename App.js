import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './src/redux/store'
import StackMain from './src/navigation/stackMain'
import PrivateStcak from './src/navigation/private-stack'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PrivateStcak />
      </Provider>
    )
  }
}

export default App
