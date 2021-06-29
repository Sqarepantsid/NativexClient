<View >

<View style={styles.headerbill}>
    <View>
        <Text style={{ fontSize: 12, color: white, fontWeight: 'bold' }}>Pending payment</Text>
    </View>

    <View style={{ marginRight: 15 }}>
        <Text style={{ fontSize: 24, color: white, fontWeight: 'bold' }}>{this.toRupiah(this.state.total)}</Text>
    </View>
</View>
<View>
    <Text style={{ fontSize: 24, color: night, fontWeight: 'bold', paddingTop: 10, textAlign: 'right', paddingRight: 30 }}>Detail Cart #{this.state.table}</Text>
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
        style={{ marginBottom: 100 }}
    />
</View>
<View style={{ position: 'absolute', bottom: 14, backgroundColor: white, width: '100%', flexDirection: 'row' }}>
    {
        this.state.pressConf == true &&
        <TouchableOpacity style={{ backgroundColor: '#00a663', height: 43, width: '65%', elevation: 3, justifyContent: 'space-evenly', borderRadius: 10, alignItems: 'center', alignContent: 'center', flexDirection: 'row', marginRight: 10 }} onPress={this.onConf}>
            <View>
                <Text style={{ color: white, fontWeight: 'bold', fontSize: 17 }}>Confirm</Text>
            </View>
        </TouchableOpacity>
    }
    {
        this.state.pressConf == false &&

        <View style={{ borderWidth: 2, borderColor: '#00a663', backgroundColor: white, height: 43, width: '65%', elevation: 3, justifyContent: 'space-evenly', borderRadius: 10, alignItems: 'center', alignContent: 'center', flexDirection: 'row', marginRight: 10 }}>
            <Text style={{ color: '#00a663', fontWeight: 'bold', fontSize: 17 }}>Confirmed</Text>
        </View>

    }

    {
        this.state.onConfirm == false &&

        <View style={{ height: 43, width: '40%', borderRadius: 10, borderWidth: 2, borderColor: 'lightgrey', backgroundColor: white, elevation: 3, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ color: 'lightgrey', fontWeight: 'bold', fontSize: 17 }}>Bill</Text>
        </View>
    }
    {
        this.state.onConfirm == true &&
        <TouchableOpacity style={{ height: 43, width: '40%', borderRadius: 10, backgroundColor: yellow, elevation: 3, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('bill')}>
            <View>
                <Text style={{ color: white, fontWeight: 'bold', fontSize: 17 }}>Bill</Text>
            </View>
        </TouchableOpacity>
    }
</View>

</View>