"use client";

import { Inter } from "next/font/google";
import Nav from "@/Components/Nav";
import { ModelContext, UserContextProvider, useUserContext } from '@/app/context/userContext';
import { useContext, useEffect } from "react";
import fetchUser from "@/Components/getUserData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestPage from "./test/page";
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

  return null; // This component doesn't render anything
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <UserContextProvider>
    <html lang="en">
      <body className={inter.className}>
        <UserFetcher />
        <Nav />
        <TestPage />
        {children}
        <ToastContainer />
      </body>
    </html>
    </UserContextProvider>
  );
}
