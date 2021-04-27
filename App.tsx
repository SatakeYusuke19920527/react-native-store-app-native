import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getShops } from './src/lib/firebase';
import { Shop } from './src/types/Shop';

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    const getFirebaseItems = async () => {
      const items = await getShops();
      setShops(items);
    };
    getFirebaseItems();
  }, []);
  return (
    <View style={styles.container}>
      <Text>SatakeApp</Text>
      {shops.map((shop, index) => {
        return (
          <View key={index}>
            <Text>{shop.name}</Text>
            <Text>{shop.place}</Text>
            <Text>{shop.imageUrl}</Text>
            <Text>{shop.score}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
