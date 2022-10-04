import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { CityProvider } from "./src/context/CityContext"
import { ResultProvider } from "./src/context/ResultContext"

import HomeScreen from './src/screens/HomeScreen'
import CityScreen from './src/screens/CityScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Weather Screen'}} />
      <Stack.Screen name='City' component={CityScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default () => {
  return <ResultProvider>
    <CityProvider>
      <App />
    </CityProvider>
  </ResultProvider>
}