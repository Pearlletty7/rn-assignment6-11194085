import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const CartScreen = ({ route, navigation }) => {
    const { cart } = route.params;
    const [currentCart, setCurrentCart] = useState(cart)};
  
    const removeFromCart = async (productId) => {
      const updatedCart = currentCart.filter((item) => item.id !== productId);
      setCurrentCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={currentCart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Button title="Remove from Cart" onPress={() => removeFromCart(item.id)} />
            </View>
          )}
        />
        <Button title="Back to Products" onPress={() => navigation.goBack()} />
      </View>
    );
  