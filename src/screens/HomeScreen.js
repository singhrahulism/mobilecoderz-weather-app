import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import axios from 'axios'

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import WeatherType from '../components/WeatherType';
import { WEATHER_BASE_URL } from '../constants/openWeather'

import CityContext from '../context/CityContext';
import ResultContext from '../context/ResultContext';

const TOP_COLOR = '#1ddbd6';
const BOTTOM_COLOR = '#1ae8c6';

const HomeScreen = () => {

    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null)
    const [day, setDay] = useState(null)
    const [year, setYear] = useState(null)

    const { cityDetails, setCityDetails } = useContext(CityContext)
    const { results, setResults } = useContext(ResultContext)

    const navigation = useNavigation()

    const weekDay = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
    }

    const getCurrentTime = () => {
        let today = new Date();
        return today ;
      }

    const openWeatherAPI = async (lat, lon) => {
        try
        {
            const API_URL = `${WEATHER_BASE_URL}&lat=${lat}&lon=${lon}`
            const response = await axios.get(API_URL)
            setResults(response.data.daily)
            console.log('Success')
        } catch(err) {
            console.log('Failure')
            console.log(err)
        }
    }

    useEffect(() => {
        let time = getCurrentTime();
        setTime(time.getHours());
        setDate(time.getDate())
        setDay(time.getDay())
        setYear(time.getFullYear())
    }, [])

    useEffect(() => {
        
        openWeatherAPI(cityDetails.lat, cityDetails.lon)
        
    }, [cityDetails])

    return <View style={styles.container}>
        <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
            <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0" stopColor={ TOP_COLOR }/>
                    <Stop offset="1" stopColor={ BOTTOM_COLOR }/>
                </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grad)"/>
        </Svg>

        {/* Row 1 Start */}
        
        <View style={styles.row1Container}>

            {/* Column 1 */}
            
            <View style={{marginRight: 15}}>
                <Text style={{...styles.commonContainer, fontSize: 18, fontWeight: 'bold'}}>Current Weather</Text>
                <TouchableOpacity
                    style={{...styles.commonContainer, ...styles.cityContainer}}
                    activeOpacity={0.65}
                    onPress={() => {navigation.navigate('City')}}
                >
                    <Text style={{color: 'white', fontSize: 17}}>{cityDetails.name}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Column 2 */}
            
            <View style={styles.currentTempContainer} >
                {
                    time >= 20 || time <= 5
                    ? <Text style={styles.currentTempTextContainer}>{results[0].temp.night}&deg;</Text>
                    :
                        time >= 6 && time <= 11
                        ? <Text style={styles.currentTempTextContainer}>{results[0].temp.morn}&deg;</Text>
                        :
                            time >= 12 && time <= 4
                            ? <Text style={styles.currentTempTextContainer}>{results[0].temp.day}&deg;</Text>
                            : <Text style={styles.currentTempTextContainer}>{results[0].temp.eve}&deg;</Text>
                }
            </View>

            {/* Column 3 */}
            
            <View style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 10}}>

                <WeatherType type={results[0].weather[0].main} />

            </View>

            {/* Column 4 */}
            
            <View style={{flex: 1, padding: 5}} >
                <View style={{backgroundColor: 'white', borderRadius: 10, flex: 1, justifyContent: 'center'}}>
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}} >
                        <Text style={{fontSize: 20, color: '#38baf2', fontWeight: 'bold'}}>{date}</Text>
                        <View style={{backgroundColor: '#ace6ff', height: 25, width: 25, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                            <AntDesign name="calendar" size={16} color="#27befb" />
                        </View>
                    </View>
                    <View style={{justifyContent: 'space-evenly', flexDirection: 'row', marginTop: 2}} >
                        <Text>{weekDay[day]}, {year}</Text>
                    </View>
                </View>
            </View>
        </View>
        
        {/* Row 1 End */}

        {/* Row 2 Start */}
        
        <View style={styles.row2Container} >

            <FlatList
                data={results}
                keyExtractor={_ => _.dt}
                horizontal
                renderItem={({item}) => {
                    return (
                        <WeatherType type={item.weather[0].main} />
                    )
                }}
            />

        </View>
        
        {/* Row 2 End */}

    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 175,
        paddingTop: 5
    },
    commonContainer: {
        marginHorizontal: 15,
        marginTop: 7,
        color: 'white'
    },
    cityContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row1Container: {
        flexDirection: 'row'
    },
    row2Container: {
        marginLeft: 5,
        marginTop: 10
    },
    currentTempContainer: {
        justifyContent: 'center'
    },
    currentTempTextContainer: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default HomeScreen ;