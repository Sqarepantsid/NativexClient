import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import Iconn from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import { getCart } from '../../redux/_action/orders'
import Modal from 'react-native-modal'


import { getTransactions, patchTransaction } from '../../redux/_action/transaction/'

import { white, night, yellow } from '../../styles/styles'
class bill extends Component {

    constructor() {
        super()
        this.state = {
            table: '',
            subtotal: 0,
            tax: 0,
            disc: 0,
            serviceCharge: 0,
            total: 0,
            isModalVisible: false
        }
    }

    _countInvoice = () => {
        const { subtotal } = this.state
        let data = subtotal + ((this.props.transaction.dataBefore.tax / 100) * subtotal)
        let serviceCharge = ((this.props.transaction.dataBefore.tax / 100) * subtotal)
        let tax = ((this.props.transaction.dataBefore.serviceCharge / 100) * data)

        total = (subtotal + serviceCharge) + tax

        this.setState({
            tax,
            serviceCharge,
            total

        })

    }

    dateTime = (time) => {
        let Menit = Math.floor(time / 60);
        let Detik = time % 60;
        return Menit + ":" + Detik;
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };


    _count = () => {
        totalku = 0
        this.props.orders.cart.map((item) => {
            let data = item.price * item.qty
            totalku = data + totalku
        })
        this.setState({
            subtotal: totalku
        })
    }

    toRupiah = (number) => {
        let rupiah = '';
        let revNumber = number.toString().split('').reverse().join('');
        for (var i = 0; i < revNumber.length; i++) if (i % 3 == 0) rupiah += revNumber.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    loading = () => {
        return (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator size={30} color={white} />
        </View>
        )
    }


    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')
        const trxId = await AsyncStorage.getItem('transactionId')
        console.log(trxId)
        await this.props.dispatch(getTransactions(trxId, table))
        await this.props.dispatch(getCart(trxId))
        await this._count()
        await this._countInvoice()
        this.setState({
            table
        })
    }

    succes = async () => {
        await clearInterval(this.props.timer.setTimer)
        await this.props.navigation.navigate('success')
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.body}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, color: yellow, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 15, color: '#00a663', fontWeight: 'bold' }}> / {item.qty}</Text>
                    </View>
                    <Text style={{ fontSize: 24, color: night, fontWeight: 'bold' }}>{this.toRupiah(item.price)}</Text>
                </View>
                <View>
                    <Icon name='checkcircle' color='#00a663' size={26} />
                </View>
            </View>
        )
    }

    render() {
        const extractKey = ({ menuId }) => menuId.toString()
        // const extractKey = this.props.orders.cart.menuId
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.der}>
                        <View>
                            <Text style={{ fontSize: 23, color: night, fontWeight: 'bold' }}>Nativex</Text>
                            <Text style={{ fontSize: 20, color: night, }}>Anything you need</Text>
                        </View>
                        <View style={styles.table}>
                            <View style={{ flexDirection: 'row', marginRight: 15 }}>
                                <Iconn name='inbox' size={18} style={{ fontWeight: 'bold', marginRight: 5 }} />
                                <Text style={{ color: night, fontWeight: 'bold' }}>No: {this.state.table}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Iconn name='schedule' size={18} style={{ fontWeight: 'bold', marginRight: 5 }} />
                                <Text style={{ color: night, fontWeight: 'bold' }}>{this.dateTime(this.props.timer.count)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Modal animationIn='fadeIn' animationOut='fadeOut' isVisible={this.state.isModalVisible}>
                    <View style={{ height: '60%', width: '100%', backgroundColor: white, borderRadius: 20, flexDirection: 'column', marginTop: 10 }}>
                        <View>
                            <View style={{ padding: 20 }}>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ color: night, fontSize: 17, fontWeight: 'bold' }}>Nativex</Text>
                                        <Text style={{ color: night, fontSize: 15 }}>Detail Invoice</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#00a663', fontSize: 20, fontWeight: 'bold' }}>#</Text>
                                        <Text style={{ color: '#00a663', fontSize: 27, fontWeight: 'bold' }}>{this.state.table}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ height: 3, backgroundColor: 'lightgrey', width: '60%' }} />
                                    <View style={{ height: 3, backgroundColor: '#00a663', width: '40%' }} />
                                </View>

                                <View style={{ marginTop: 10 }}>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ color: night, fontSize: 15, fontWeight: 'bold' }}>Subtotal: </Text>
                                        <Text style={{ color: '#00a663', fontSize: 15, fontWeight: 'bold' }}>{this.toRupiah(this.state.subtotal)}</Text>
                                    </View>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ color: night, fontSize: 15, fontWeight: 'bold' }}>discount: </Text>
                                        <Text style={{ color: '#00a663', fontSize: 15, fontWeight: 'bold' }}>{this.toRupiah(this.state.disc)}</Text>
                                    </View>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ color: night, fontSize: 15, fontWeight: 'bold' }}>serviceCharge (5%): </Text>
                                        <Text style={{ color: '#00a663', fontSize: 15, fontWeight: 'bold' }}>{this.toRupiah(this.state.serviceCharge)}</Text>
                                    </View>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ color: night, fontSize: 15, fontWeight: 'bold' }}>tax (10%): </Text>
                                        <Text style={{ color: '#00a663', fontSize: 15, fontWeight: 'bold' }}>{this.toRupiah(this.state.tax)}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                                    <View style={{ height: 3, backgroundColor: 'lightgrey', width: '30%' }} />
                                    <View style={{ height: 3, backgroundColor: '#00a663', width: '18%' }} />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: night, fontSize: 15, fontWeight: 'bold' }}>Total: </Text>
                                    <Text style={{ color: '#00a663', fontSize: 30, fontWeight: 'bold' }}>{this.toRupiah(this.state.total)}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'center', height: 20 }}>
                                <TouchableOpacity onPress={this.toggleModal}>
                                    <Icon name='closecircle' color={yellow} size={45} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 12, color: white, fontWeight: 'bold' }}>Pending payment</Text>
                    </View>

                    <View style={{ marginRight: 15 }}>
                        {
                            this.props.orders.isLoading == true &&
                            this.loading()
                        }
                        {
                            this.props.orders.isLoading == false &&

                            <Text style={{ fontSize: 24, color: white, fontWeight: 'bold' }}>{this.toRupiah(this.state.total)}</Text>
                        }
                    </View>
                </View>

                <Text style={{ fontSize: 24, color: night, fontWeight: 'bold', paddingTop: 10, textAlign: 'right', paddingRight: 30 }}>Detail Bill #{this.state.table}</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 10 }}>
                    <View style={{ height: 3, backgroundColor: 'lightgrey', width: '60%' }} />
                    <View style={{ height: 3, backgroundColor: '#00a663', width: '40%' }} />
                </View>

                <FlatList
                    snapToInterval={270}
                    decelerationRate="normal"
                    showsVerticalScrollIndicator={false}
                    data={this.props.orders.cart}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />


                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, height: 50, width: '40%', backgroundColor: yellow, borderRadius: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignContent: 'center', marginRight: 10 }} onPress={this.toggleModal}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 20, color: '#00a663', fontWeight: 'bold', marginBottom: 3 }}>Detail</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, height: 50, width: '50%', backgroundColor: '#00a663', borderRadius: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignContent: 'center' }} onPress={() => this.succes()}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 20, color: white, fontWeight: 'bold', marginBottom: 3 }}>Payment</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

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


export default connect(mapStateToProps)(bill)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    body: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        marginTop: 20,
        backgroundColor: '#00a663',
        height: 120,
        elevation: 3,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '70%',
        padding: 20,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    der: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    table: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})