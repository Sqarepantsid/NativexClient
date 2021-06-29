import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { yellow, white } from '../styles/styles'



class CheckStack extends Component {
    componentDidMount() {
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        try {
            const fetchData = await AsyncStorage.getItem('tableNumber')
            if (fetchData != null) {
                this.props.navigation.navigate('PrivateStack')
            } else {
                this.props.navigation.navigate('PublicStack')
            }
        } catch (e) {
            alert(e)
        }
    }

    render() {
        return (
            // <View>
            //   <ActivityIndicator />
            //   <StatusBar barStyle="default" />
            // </View>
            <View style={[styles.container, styles.horizontal]}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>Please Waiting</Text>
                <ActivityIndicator size={50} color={yellow} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

//export default App;
export default CheckStack;