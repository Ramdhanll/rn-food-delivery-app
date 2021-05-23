import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'

import { COLORS, icons, SIZES, FONTS, GOOGLE_API_KEY } from '../constants'

export default function OrderDelivery({ route, navigation }) {
   const [restaurant, setRestaurant] = useState(null)
   const [streetName, setStreetName] = useState('')
   const [fromLocation, setFromLocation] = useState(null)
   const [toLocation, setToLocation] = useState(null)
   const [region, setRegion] = useState(null)

   useEffect(() => {
      let { restaurant, currentLocation } = route.params

      let fromLoc = currentLocation.gps
      let toLoc = restaurant.location
      let street = currentLocation.streetName

      let mapRegion = {
         latitude: (fromLoc.latitude + toLoc.latitude) / 2,
         longitude: (fromLoc.longitude + toLoc.longitude) / 2,
         latitudeDelta: Math.abs(fromLoc.latitude + toLoc.latitude) * 2,
         longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
      }

      setRestaurant(restaurant)
      setStreetName(street)
      setFromLocation(fromLoc)
      setToLocation(toLoc)
      setRegion(mapRegion)
   }, [])

   const renderMap = () => {
      const destinationMarker = () =>
         toLocation && (
            <Marker coordinate={toLocation}>
               <View
                  style={{
                     height: 40,
                     width: 40,
                     borderRadius: 20,
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: COLORS.white,
                  }}
               >
                  <View
                     style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary,
                     }}
                  >
                     <Image
                        source={icons.pin}
                        style={{
                           width: 25,
                           height: 25,
                           tintColor: COLORS.white,
                        }}
                     />
                  </View>
               </View>
            </Marker>
         )

      const carIcon = () =>
         fromLocation && (
            <Marker
               coordinate={fromLocation}
               anchor={{ x: 0.9, y: 0.5 }}
               flat={true}
               // rotation
            >
               <Image
                  source={icons.car}
                  style={{
                     width: 40,
                     height: 40,
                     tintColor: 'black',
                  }}
               />
            </Marker>
         )

      return (
         <View style={{ flex: 1 }}>
            <MapView
               provider={PROVIDER_GOOGLE}
               initialRegion={region}
               style={styles.map}
            >
               <MapViewDirections
                  origin={fromLocation}
                  destination={toLocation}
                  apikey={GOOGLE_API_KEY}
                  strokeWidth={5}
                  strokeColor={COLORS.primary}
                  optimizeWaypoints={true}
               />
               {destinationMarker()}
               {carIcon()}
            </MapView>
         </View>
      )
   }

   return <View>{renderMap()}</View>
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
})
