import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
    const [cart, setCart] = useState([])};
  
    useEffect(() => {
      const loadCart = async () => {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      };
  
      loadCart();
    }, []); 
    return (
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.product}>
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          )}
        />
        <Button title="View Cart" onPress={() => navigation.navigate('Cart', { cart })} />
      </View>
    );