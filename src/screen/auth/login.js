import React, { Component } from 'react'
import { View, Text, Image, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { white, night, yellow } from '../../styles/styles'


class success extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: white, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={{ height: 300, width: 300 }} source={require('../../assets/image/task2.png')} />
                    <Text style={{ fontSize: 20, color: 'grey', fontWeight: 'bold', textAlign: 'center' }}>Sorry..</Text>
                    <Text style={{ fontSize: 20, color: 'grey', textAlign: 'center' }}>Promo Not Found :(</Text>
                </View>
            </View>
        )
    }
}

export default success