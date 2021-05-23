import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import {
   StyleSheet,
   Text,
   View,
   SafeAreaView,
   Image,
   TouchableOpacity,
   FlatList,
} from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import {
   initialCurrentLocation,
   categoryData,
   restaurantData,
} from '../Dummies/Products'

export default function Home({ navigation }) {
   const [categories, setCategories] = useState(categoryData)
   const [selectedCategory, setSelectedCategory] = useState(null)
   const [restaurants, setRestaurants] = useState(restaurantData)
   const [currentLocation, setCurrentLocation] = useState(
      initialCurrentLocation
   )

   const onSelectCategory = (category) => {
      // filter restaurant
      let restaurantList = restaurantData.filter((c) =>
         c.categories.includes(category.id)
      )

      setRestaurants(restaurantList)
      setSelectedCategory(category)
   }

   const getCategoryNameById = (id) => {
      let category = categories.filter((c) => c.id == id)

      if (category.length > 0) return category[0].name

      return ''
   }

   const renderHeader = () => (
      <View
         style={{
            flexDirection: 'row',
            height: 35,
            marginTop: 10,
         }}
      >
         <TouchableOpacity
            style={{
               width: 50,
               paddingLeft: SIZES.padding * 2,
               justifyContent: 'center',
            }}
         >
            <Image
               source={icons.nearby}
               resizeMode="contain"
               style={{ width: 28, height: 28 }}
            />
         </TouchableOpacity>

         <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
         >
            <View
               style={{
                  width: '70%',
                  height: '100%',
                  backgroundColor: COLORS.lightGray3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius,
               }}
            >
               <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
            </View>
         </View>

         <TouchableOpacity
            style={{
               width: 50,
               paddingRight: SIZES.padding * 2,
               justifyContent: 'center',
            }}
         >
            <Image
               source={icons.basket}
               resizeMode="contain"
               style={{ width: 28, height: 28 }}
            />
         </TouchableOpacity>
      </View>
   )

   const renderMainCategories = () => {
      const renderItem = ({ item }) => (
         <TouchableOpacity
            style={{
               padding: SIZES.padding,
               paddingBottom: SIZES.padding * 2,
               backgroundColor:
                  selectedCategory?.id == item.id // Optional chaining operator, jika ada nilai pada selectedCategory.id return nilai tersebut, jika tidak return undefined
                     ? COLORS.primary
                     : COLORS.white,
               borderRadius: SIZES.radius,
               alignItems: 'center',
               justifyContent: 'center',
               marginRight: SIZES.padding,
               ...styles.shadow,
            }}
            onPress={() => onSelectCategory(item)}
         >
            <View
               style={{
                  width: 40,
                  height: 40,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                     selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.lightGray,
               }}
            >
               <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{ width: 28, height: 28 }}
               />
            </View>

            <Text
               style={{
                  marginTop: SIZES.padding,
                  color:
                     selectedCategory?.id == item.id
                        ? COLORS.white
                        : COLORS.black,
                  ...FONTS.body5,
               }}
            >
               {item.name}
            </Text>
         </TouchableOpacity>
      )

      return (
         <View style={{ padding: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h1 }}>Main</Text>
            <Text style={{ ...FONTS.h1 }}>Categories</Text>

            <FlatList
               data={categories}
               horizontal
               showsHorizontalScrollIndicator={false}
               keyExtractor={(item) => `${item.id}`}
               renderItem={renderItem}
               contentContainerStyle={{ paddingTop: SIZES.padding * 2 }}
            />
         </View>
      )
   }

   const renderRestaurantList = () => {
      const renderItemRestaurantList = ({ item }) => (
         <TouchableOpacity
            style={{
               marginBottom: SIZES.padding * 2,
            }}
            onPress={() =>
               navigation.navigate('Restaurant', { item, currentLocation })
            }
         >
            <View style={{ marginBottom: SIZES.padding }}>
               <Image
                  source={item.photo}
                  resizeMode="cover"
                  style={{
                     width: '100%',
                     height: 200,
                     borderRadius: SIZES.radius,
                  }}
               />
               <View
                  style={{
                     position: 'absolute',
                     bottom: 0,
                     height: 50,
                     width: SIZES.width * 0.3,
                     backgroundColor: COLORS.white,
                     borderTopRightRadius: SIZES.radius,
                     borderBottomLeftRadius: SIZES.radius,
                     alignItems: 'center',
                     justifyContent: 'center',
                     ...styles.shadow,
                  }}
               >
                  <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
               </View>
            </View>

            {/* Restaurant info  */}
            <Text style={FONTS.body2}>{item.name}</Text>
            <View
               style={{
                  marginTop: SIZES.padding,
                  flexDirection: 'row',
               }}
            >
               {/* Rating */}
               <Image
                  source={icons.star}
                  style={{
                     height: 20,
                     width: 20,
                     tintColor: COLORS.primary,
                     marginRight: 10,
                  }}
               />
               <Text style={FONTS.body3}>{item.rating}</Text>

               {/* Categories */}
               <View
                  style={{
                     flexDirection: 'row',
                     marginLeft: 10,
                  }}
               >
                  {item.categories.map((categoryId) => (
                     <View
                        style={{
                           flexDirection: 'row',
                        }}
                        key={categoryId}
                     >
                        <Text style={{ ...FONTS.body3 }}>
                           {getCategoryNameById(categoryId)}
                        </Text>
                        <Text
                           style={{
                              ...FONTS.h3,
                              color: COLORS.darkgray,
                           }}
                        >
                           {' '}
                           .{' '}
                        </Text>
                     </View>
                  ))}
                  {/* Price */}

                  {[1, 2, 3].map((priceRating) => (
                     <Text
                        key={priceRating}
                        style={{
                           ...FONTS.body3,
                           color:
                              priceRating <= item.priceRating
                                 ? COLORS.black
                                 : COLORS.darkgray,
                        }}
                     >
                        $
                     </Text>
                  ))}
               </View>
            </View>
         </TouchableOpacity>
      )
      return (
         <View style={{ flex: 1 }}>
            <FlatList
               data={restaurants}
               keyExtractor={(item) => `${item.id}`}
               renderItem={renderItemRestaurantList}
               contentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 2,
                  paddingBottom: 70,
               }}
            />
         </View>
      )
   }

   return (
      <SafeAreaView style={styles.container}>
         {renderHeader()}
         {renderMainCategories()}
         {renderRestaurantList()}
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.lightGray4,
      marginTop: 30,
   },
   shadow: {
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1,
   },
})
