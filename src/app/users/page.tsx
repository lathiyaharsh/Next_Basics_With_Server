"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import User from '../../../models/User'; 
const UsersPage: React.FC = () => {

  interface User  {
    _id:string
    name: string;
    email: string;
    password: string;
    description: string;
    city: string;
    gender: string;
    hobby: string[];
    isActive: boolean;
  }

  const [users, setUsers] = useState<User[] >([]); 
  const router = useRouter(); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data); 
      } catch (error) {
        console.error('Error fetching users:', error);
        //router.push('/error'); 
      }
    };

    fetchData();
  }, []); 

  console.log(users);
  const renderUsers = () => {
    
    return users.map((users) => (
      <div key={users._id}>
        <p>Name: {users.name}</p>
        <p>Email: {users.email}</p>
      </div>
    ));
  };

  return (
    <div className="users-page">
      <h1>Users Page</h1>
      {users.length > 0 ? (
        renderUsers()
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
};

export default UsersPage;