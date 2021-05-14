import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import { UserContext } from '../contexts/UserContext';

export default function AppNavigator() {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
}
