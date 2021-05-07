import React, { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { UserContext } from './src/contexts/UserContext';
import { User } from './src/types/User';

export default function App() {
  const [user, setUser] = useState<User | null>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
