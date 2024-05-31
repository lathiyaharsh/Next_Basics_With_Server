"use client";

import { Inter } from "next/font/google";
import Nav from "@/Components/Nav";
import { ModelContext, UserContextProvider, useUserContext } from '@/app/context/userContext';
import { useContext, useEffect } from "react";
import fetchUser from "@/Components/getUserData";

const inter = Inter({ subsets: ["latin"] });

function UserFetcher() {
  const [, setUser] = useUserContext();

  const getApi = async () => {
    try {
      const result = await fetchUser();
      setUser(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return null; 
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserContextProvider>
        <UserFetcher />
        <Nav />
        {children}
    </UserContextProvider>
  );
}
