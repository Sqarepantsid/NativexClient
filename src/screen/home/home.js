import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import Iconn from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'


import { white, night, yellow } from '../../styles/styles'
import { timerOn, setTimer } from '../../redux/_action/timers'
import StackMain from '../../navigation/stackMain'


class home extends Component {

    constructor() {
        super()
        this.state = {
            table: '',
            time: 0,
            isi: false
        }
    }

    timer = async () => {
        await this.setState({
            time: this.state.time + 1
        })
        await this.props.dispatch(timerOn(this.state.time))
    }

    dateTime = (time) => {
        let Menit = Math.floor(time / 60);
        let Detik = time % 60;
        return Menit + ":" + Detik;
    }

    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')
        await this.setState({
            table
        })
        this.set = setInterval(this.timer, 1000)
        await this.props.dispatch(setTimer(this.set))
    }



    loading = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }}>
                <ActivityIndicator size={40} color={yellow} />
            </View>)
    }


    renderItem = ({ item }) => {
        return (
            <View style={styles.FlatList}>
                <TouchableOpacity underlayColor='white' onPress={() => this.props.navigation.navigate('menu', { rows: item })}>
                    <Card
                        image={{ uri: item.image }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    </Card>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <View style={styles.header}>
                    <View>
                        <Text style={styles.textHeader}>Nativex</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row', marginRight: 15 }}>
                            <Iconn name='inbox' size={18} style={{ fontWeight: 'bold', marginRight: 5 }} />
                            <Text style={{ color: night, fontWeight: 'bold' }}>No: {this.state.table}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconn name='schedule' size={18} style={{ fontWeight: 'bold', marginRight: 5 }} />
                            <Text style={{ color: night, fontWeight: 'bold' }}>{this.dateTime(this.state.time)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.search}>
                        <Icon name='search1' size={26} />
                        <TextInput style={styles.textContent} placeholder='Search anything...' />
                    </View>

                    {
                        this.props.orders.cart == 0 ?

                            <View style={styles.qr_code}>
                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')}> */}
                                <View style={{ justifyContent: 'space-around' }}>
                                    <Icon name='shoppingcart' size={26} />
                                </View>
                                {/* </TouchableOpacity> */}
                            </View>

                            :

                            <View style={{ ...styles.qr_code, backgroundColor: '#00a663' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')}>
                                    <View style={{ justifyContent: 'space-around' }}>
                                        <Icon name='shoppingcart' size={26} color={white} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
                <StackMain />
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction,
        orders: state.orders,
        timer: state.timer
    }
}


export default connect(mapStateToProps)(home)

const styles = StyleSheet.create({
    table: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: white,
        paddingLeft: 20,
        paddingRight: 20
    },
    FlatList: {
        flex: 1,
        padding: 0
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    textContent: {
        marginLeft: 20,
        fontSize: 15,
        color: night,
        width: '70%'
    },
    textHeader: {
        fontSize: 23,
        color: night,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row'
    },
    search: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        height: 50,
        width: '80%',
        borderRadius: 30,
        paddingLeft: 20
    },
    qr_code: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: yellow,
        height: 50,
        width: '20%',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        padding: 10
    },
    bottom: {
        height: '10%',
        width: '80%',
        backgroundColor: night,
        borderRadius: 30
    }
})
