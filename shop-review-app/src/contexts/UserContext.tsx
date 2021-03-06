import { createContext } from 'react';
import { User } from '../types/User';

type UserContextValue = {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});
