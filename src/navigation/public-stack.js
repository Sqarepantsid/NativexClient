import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import splash from '../screen/splash/splash'

const AppStack = createStackNavigator({
    splash: {
        screen: splash
    }

}, {
        headerMode: 'none',
        initialRouteName: 'splash'
    })


const AppContainer = createAppContainer(AppStack)


class PublicStack extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}

export default PublicStack