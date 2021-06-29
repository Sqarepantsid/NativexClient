import React, { Component } from 'react'
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'


import { white, night, yellow } from '../../styles/styles'

import { RESET } from '../../redux/_action/orders'

class success extends Component {

    constructor() {
        super()
        this.state = {
            table: ''
        }
    }

    dateTime = (time) => {
        let Menit = Math.floor(time / 60);
        let Detik = time % 60;
        return Menit + ":" + Detik;
    }

    logout = async () => {
        await AsyncStorage.clear()
        await this.props.dispatch(RESET(this.props.orders.cart))
        await this.props.navigation.navigate('splash');

    }

    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')
        this.setState({
            table
        })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: yellow, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <StatusBar
                    backgroundColor={yellow}
                    barStyle='light-content'
                />
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, color: white, fontWeight: 'bold', textAlign: 'center' }}>PLEASE BRING THE PHONE TO THE CASHIER</Text>
                    <Text style={{ fontSize: 20, color: white, fontWeight: 'bold', textAlign: 'center' }}>TO PROCCED THE PAYMENT</Text>

                    <Text style={{ marginTop: 20, fontSize: 40, color: white, fontWeight: 'bold', textAlign: 'center' }}>#{this.state.table}</Text>
                    <Text style={{ marginTop: 20, fontSize: 20, color: white, fontWeight: 'bold', textAlign: 'center' }}>Time Spend: {this.dateTime(this.props.timer.count)}</Text>
                    <Image style={{ height: 230, width: 230 }} source={require('../../assets/image/goal.png')} />

                    <TouchableOpacity style={{ marginTop: 30, height: 50, width: '90%', backgroundColor: white, borderRadius: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'flex-end' }} onPress={this.logout}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 20, color: '#00a663', fontWeight: 'bold', marginBottom: 3 }}>BACK TO HOME</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        menus: state.menus,
        transaction: state.transaction,
        orders: state.orders,
        timer: state.timer
    }
}

export default connect(mapStateToProps)(success)