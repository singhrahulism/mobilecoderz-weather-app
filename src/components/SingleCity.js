import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const SingleCity = ({ details }) => {

    const cityName = details.name
    const countryCode = details.country

    return <View style={styles.container}>
        <Text style={{fontSize: 16}} >{cityName}</Text>
        <Text style={{fontSize: 12}} >{countryCode}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginVertical: 5,
        height: 70,
        justifyContent: 'center',
        borderBottomColor: '#dadee3', borderBottomWidth: 1
    }
})

export default SingleCity ;