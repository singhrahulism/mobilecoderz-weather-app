import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherType = ({ type }) => {
    return <View style={styles.container}>
        {
            type === 'Rain'
            ? <MaterialCommunityIcons name="weather-pouring" size={24} color="white" />
            :
                type === 'Clouds'
                ? <MaterialCommunityIcons name="weather-cloudy" size={24} color="white" />
                :
                    type === 'Sunny'
                    ? <MaterialCommunityIcons name="weather-sunny" size={24} color="white" />
                    : <MaterialCommunityIcons name="weather-night-partly-cloudy" size={24} color="white" />
        }
        <Text style={styles.textContainer}>{type}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        color: 'white',
        fontSize: 16
    }
})

export default WeatherType ;