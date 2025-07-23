'use client';
import React, { createContext, useContext, useState } from 'react';

type UserInfo = {
  email: string;
  name: string;
} | null;

type UserContextType = {
  user: UserInfo; 
  setUser: (user: UserInfo) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
} 