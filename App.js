import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'

import { Home, Restaurant, OrderDelivery } from './screens'
import Tabs from './navigation/tabs'

const Stack = createStackNavigator()

export default function App() {
   const [loaded] = useFonts({
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
      'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
      'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
      'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-BoldItalic': require('./assets/fonts/RobotoCondensed-BoldItalic.ttf'),
      'RobotoCondensed-Italic': require('./assets/fonts/RobotoCondensed-Italic.ttf'),
      'RobotoCondensed-Light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
      'RobotoCondensed-LightItalic': require('./assets/fonts/RobotoCondensed-LightItalic.ttf'),
      'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
   })

   if (!loaded) {
      return null
   }

   return (
      <NavigationContainer>
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
            }}
            initialRouteName={'Home'}
         >
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

const styles = StyleSheet.create({})
