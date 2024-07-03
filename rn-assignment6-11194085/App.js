import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const products = [
  { id: '1', name: 'Reversible Angora Cardigan', price: '$120' },
  { id: '2', name: 'Recycle Boucle Knit Cardigan Pink', price: '$120' },
  { id: '3', name: 'Office Wear for Your Office', price: '$120' },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

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
};

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [currentCart, setCurrentCart] = useState(cart);

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
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  product: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
