
"use client";
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the user context
type UserContextType = [user: any, setUser: Dispatch<SetStateAction<any>>];

// Create a context with a default non-null value
const defaultUserContext: UserContextType = [null, () => {}];
export const ModelContext = createContext<UserContextType>(defaultUserContext);

// Define your provider component
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  

  return (
    <ModelContext.Provider value={[user, setUser]}>
      {children}
    </ModelContext.Provider>
  );
}

// Create a custom hook to use the context
export function useUserContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}
