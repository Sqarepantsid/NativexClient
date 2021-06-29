import React from 'react'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import { white, night, yellow } from '../styles/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['ViewPagerAndroid']);

import Food from '../screen/home/categories/food'
import Drink from '../screen/home/categories/drink'
import Dessert from '../screen/home/categories/dessert'

const TopNav = createMaterialTopTabNavigator({
    Food: {
        screen: Food,
        navigationOptions: {
            tabBarLabel: "Food",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="local-dining" size={20} color={tintColor} />
            )
        }
    },
    Drink: {
        screen: Drink,
        navigationOptions: {
            tabBarLabel: "Drink",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="local-cafe" size={20} color={tintColor} />
            )
        }
    },
    Dessert: {
        screen: Dessert,
        navigationOptions: {
            tabBarLabel: "Dessert",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="local-pizza" size={20} color={tintColor} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: night,
            inactiveTintColor: 'silver',
            labelStyle: {
                fontSize: 10
            },
            showLabel: true,
            style: {
                backgroundColor: white,
                elevation: 0
            }, indicatorStyle: {
                backgroundColor: yellow
            },
            showIcon: true
        }
    }
)

export default StackMain = createAppContainer(TopNav)