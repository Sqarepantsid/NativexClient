import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import home from '../screen/home/home'
import menu from '../screen/home/menu'
import orders from '../screen/home/orders'
import success from '../screen/home/success'
import login from '../screen/auth/login'
import PrivateNav from './private-nav'
import splash from '../screen/splash/splash'
import bill from '../screen/home/bill'

const AppStack = createStackNavigator({
    home: {
        screen: home
    },
    success: {
        screen: success
    },
    bill: {
        screen: bill
    },
    menu: {
        screen: menu
    },
    orders: {
        screen: orders
    },
    login: {
        screen: login
    },
    PrivateNav: {
        screen: PrivateNav
    },
    splash: {
        screen: splash
    }

}, {
        headerMode: 'none',
        initialRouteName: 'splash'
    })


const AppContainer = createAppContainer(AppStack)


class PrivateStack extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}

export default PrivateStack