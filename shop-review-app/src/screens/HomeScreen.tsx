import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { ShopReviewItem } from '../components/ShopReviewItem';
import { getShops } from '../lib/firebase';
import { Shop } from '../types/Shop';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<Props> = ({ navigation }: { navigation: any }) => {
  const [shops, setShops] = useState<Shop[] | undefined>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const items = await getShops();
    setShops(items);
  };

  const onPressShop = (shop: Shop) => {
    navigation.navigate('Shop', { shop });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
