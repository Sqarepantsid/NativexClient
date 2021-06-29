import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'

import { white, night, yellow } from '../../../styles/styles'
import { getDessert, updateDessert } from '../../../redux/_action/menus'
import { addToCart, UpdateCart, Increment, Decrement } from '../../../redux/_action/orders'

class Dessert extends Component {

    constructor() {
        super()
        this.state = {
            dataOrder: [],
            menu: {
                qty: 0
            }
        }
    }

    addToCart = async (item, transactionId) => {
        let data = this.props.orders.cart.findIndex(x => x.id == item.id)
        if (data >= 0) {
        } else {
            await this.props.dispatch(updateDessert(item, this.props.menus.dessert, this.props.menus.dessert))
            await this.props.dispatch(addToCart(item, this.props.transaction.data.id))
        }
    }

    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')

        this.setState({
            table
        })
    }

    inc = async (item) => {
        await this.props.dispatch(Increment(this.props.orders.cart[0], this.props.orders.cart, this.props.orders.cart))
    }

    dec = () => {

        if (this.state.qty == 0) {
            this.props.dispatch(UpdateCart(item, this.props.transaction.data.id))
        } else {
            this.setState({
                menu: {
                    qty: this.state.qty - 1
                }
            })
        }
    }

    componentWillMount() {
        this.props.dispatch(getDessert())
    }


    loading = () => {
        return (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator size={30} color={yellow} />
        </View>
        )
    }


    renderItem = ({ item }) => {
        const price = item.price
        var number_string = price.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g)

        if (ribuan) {
            separator = sisa ? '.' : ''
            rupiah += separator + ribuan.join('.')
        }

        return (
            <View style={styles.FlatList}>
                <Card
                    image={{ uri: item.image }}
                >
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: night }}>{item.name}</Text>
                            <Text style={{ fontWeight: 'bold', color: '#00a663' }}>Rp.{rupiah}</Text>
                        </View>


                        {
                            item.selected == false &&
                            <TouchableOpacity onPress={() => this.addToCart(item, this.props.transaction.data.id)}>
                                <View style={{ height: 30, width: 90, backgroundColor: 'white', elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5, borderRadius: 5 }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', color: '#00a663' }}>Add to Cart</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }

                        {
                            item.selected == true &&
                            // <TouchableOpacity onPress={() => this.addToCart(item, this.props.transaction.data.id)}>
                            <View style={{ height: 30, width: 90, backgroundColor: '#00a663', elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderRadius: 5 }}>

                                <Text style={{ fontWeight: 'bold', color: white }}>Done</Text>
                                <Icon name='checkcircle' color={white} size={15} />
                            </View>
                            // </TouchableOpacity>

                        }
                    </View>
                </Card>
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
                <View>
                    {
                        this.props.menus.isLoading == true &&
                        this.loading()
                    }
                    {
                        this.props.menus.isLoading == false &&
                        <View>
                            <FlatList
                                snapToInterval={270}
                                decelerationRate="normal"
                                showsVerticalScrollIndicator={false}
                                data={this.props.menus.dessert}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={this.renderItem}
                                extraData={this.props.menus.dessert}
                            />
                        </View>
                    }
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        menus: state.menus,
        transaction: state.transaction,
        orders: state.orders
    }
}


export default connect(mapStateToProps)(Dessert)

const styles = StyleSheet.create({
    table: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    container: {
        flex: 1,
        backgroundColor: white
    },
    FlatList: {
        flex: 1,
        padding: 0
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
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
