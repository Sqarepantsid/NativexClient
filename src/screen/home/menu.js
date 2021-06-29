import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'

import { white, night, yellow } from '../../styles/styles'
import { getMenusByCategory, updateMenu } from '../../redux/_action/menus'
import { addToCart, UpdateCart } from '../../redux/_action/orders'

class menus extends Component {

    constructor() {
        super()
        this.state = {
            dataOrder: [],
        }
    }

    addToCart = async (item, transactionId) => {
        let data = this.props.orders.cart.findIndex(x => x.id == item.id)
        console.warn(data)
        if (data >= 0) {
        } else {
            let a = this.props.menus.data.map(item => ({
                ...item, selected: true
            }))
            await this.props.dispatch(updateMenu(item, this.props.menus.data, this.props.menus.data))
            await this.props.dispatch(addToCart(item, this.props.transaction.data.id))
        }
    }

    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')

        this.setState({
            table
        })
    }

    inc = () => {
        this.setState({
            menu: {
                qty: this.state.qty + 1
            }
        })
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
        const { navigation } = this.props;
        const data = navigation.getParam('rows');
        this.props.dispatch(getMenusByCategory(data.id))
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
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
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
                            <View style={{ height: 30, width: 90, backgroundColor: '#00a663', elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5, borderRadius: 5 }}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', color: white }}>Done</Text>
                                </View>
                            </View>
                            // </TouchableOpacity>

                            // <View style={{ height: 30, width: 90, backgroundColor: 'white', elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5, borderRadius: 5 }}>
                            //     <TouchableOpacity onPress={this.dec}>
                            //         <View>
                            //             <Icon name='minus' color='#00a663' size={20} />
                            //         </View>
                            //     </TouchableOpacity>
                            //     <Text style={{ fontWeight: 'bold', color: night }}>{this.state.menu.qty}</Text>
                            //     <TouchableOpacity onPress={this.inc}>
                            //         <View>
                            //             <Icon name='plus' color='#00a663' size={20} />
                            //         </View>
                            //     </TouchableOpacity>
                            // </View>
                        }
                    </View>
                </Card>
            </View >
        )
    }

    render() {
        let tId = `${this.props.transaction.data.id}`
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <View style={styles.header}>
                    <View>
                        <Text style={styles.textHeader}>Nativex</Text>
                        <Text style={{
                            fontSize: 20,
                            color: night,
                        }}>Anything you need</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.search}>
                        <Icon name='search1' size={26} />
                        <TextInput style={styles.textContent} placeholder='Search anything...' />
                    </View>
                    <View style={styles.qr_code}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('orders')}>
                            <View style={{ justifyContent: 'space-evenly' }}>
                                <Icon name='shoppingcart' size={26} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.table}>
                    <Text style={{ color: night, fontWeight: 'bold' }}>#{tId}</Text>
                    <Text style={{ color: night, fontWeight: 'bold' }}>No: {this.state.table}</Text>
                    <Text style={{ color: night }}>30:23:00</Text>
                </View>
                <View>
                    {
                        this.props.menus.isLoading == true &&
                        this.loading()
                    }
                    {
                        this.props.menus.isLoading == false &&
                        <View style={{ paddingBottom: 80 }}>
                            <FlatList
                                snapToInterval={270}
                                decelerationRate="normal"
                                showsVerticalScrollIndicator={false}
                                data={this.props.menus.data}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={this.renderItem}
                                style={{ marginBottom: 100 }}
                                extraData={this.props.menus.data}
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


export default connect(mapStateToProps)(menus)

const styles = StyleSheet.create({
    table: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
