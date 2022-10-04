import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import SingleCity from '../components/SingleCity';
import { CITY_LIST_BASE_URL } from '../constants/openWeather'

import CityContext from '../context/CityContext';

const CityScreen = () => {

    const [cityName, setCityName] = useState()
    const [results, setResults] = useState([])
    
    const { setCityDetails } = useContext(CityContext)
    
    const navigation = useNavigation()

    const openWeatherAPI = async (location) => {
        try
        {
            const API_URL = `${CITY_LIST_BASE_URL}${location}`
            const response = await axios.get(API_URL)
            setResults(response.data.data.Record)
        } catch(err) {
            console.log('Failure in CityScreen - openWeatherAPI')
            console.log(err)
        }
    }

    const changeCityDetails = (newCity) => {
        setCityDetails({
            name: newCity.name,
            lon: newCity.coord.lon,
            lat: newCity.coord.lat
        })
    }

    return <View style={styles.container}>
        <TouchableOpacity
            activeOpacity={0.5}
            style = {styles.headerContainer}
            onPress = {() => navigation.goBack()}
        >
            <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Change City
            </Text>
        </TouchableOpacity>
        <SearchBar
            term = {cityName}
            searchTermChanges = {updatedCityName => {
                setCityName(updatedCityName)
                openWeatherAPI(updatedCityName)
            }}
        />
        <FlatList
            data = {results}
            keyExtractor = {_ => _._id}
            renderItem = {({ item }) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                                changeCityDetails(item)
                                navigation.goBack()
                        }}
                    >
                        <SingleCity details={item} />
                    </TouchableOpacity>
                )
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edfafa',
        paddingTop: StatusBar.currentHeight+10,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default CityScreen ;