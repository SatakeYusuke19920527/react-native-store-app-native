import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';

export default function AppNavigator() {
  const user = { id: 123 };
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
}
