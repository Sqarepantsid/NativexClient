import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, ActivityIndicator, StatusBar, Image } from 'react-native'
import { white, night, yellow } from '../../styles/styles'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'

import { addTransaction, getTransactions } from '../../redux/_action/transaction'


class splash extends Component {
    constructor() {
        super()
        this.state = {
            table: null,
            isPress: false,
            isLoading: false

        }
    }

    onTable = (table) => { this.setState({ table }) }
    tableSend = async () => {
        if (this.state.table == null) {
            return false
        } else {
            await this.setState({
                isPress: true
            })
            await AsyncStorage.setItem('tableNumber', this.state.table)
            await this.props.dispatch(addTransaction({
                tableNumber: this.state.table,
                isPaid: 0
            }))
            await AsyncStorage.setItem('transactionId', `${this.props.transaction.data.id}`)
            await this.props.navigation.navigate('home')
            await this.setState({
                isPress: false,
                table: null
            })
        }
    }

    render() {
        return (
            <View style={styles.body}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <Image style={{ height: 230, width: 230 }} source={require('../../assets/image/remote-team.png')} />
                <View>
                    <TextInput placeholder='Input table number' keyboardType={'numeric'} style={styles.TextInput} underlineColorAndroid={night} onChangeText={this.onTable}></TextInput>
                    {
                        this.state.isPress == false &&
                        <TouchableOpacity onPress={this.tableSend}>
                            <View style={{
                                backgroundColor: yellow, height: 50, alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10
                            }} ><Text style={{ color: white, fontWeight: 'bold' }}>Submit</Text></View>
                        </TouchableOpacity>
                    }
                    {
                        this.state.isPress == true &&
                        <View style={{
                            backgroundColor: yellow, height: 50, alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10
                        }} onPress={this.tableSend} ><ActivityIndicator size={30} color={white} /></View>
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction
    }
}

export default connect(mapStateToProps)(splash)

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    },
    TextInput: {
        width: '70%',
        fontSize: 16,
        textAlign: 'center'
    }
})