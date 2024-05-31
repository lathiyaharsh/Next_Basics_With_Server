import React, { useContext, useEffect } from 'react';
import { ModelContext } from '@/app/context/userContext';
import TestPage from '@/app/test/page';

export const AdminComponent = () => <div>Admin Dashboard</div>;
export const ManagerComponent = () => <div>Manager Dashboard</div>;
export const UserComponent = () => {
  const [user, setUser] = useContext(ModelContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/users/profile", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Fetched user data:", data);

        setUser(data.user);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    if (user === null) {      
      fetchUserProfile();
    }
  }, [user, setUser]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is the home page.</p>
      <TestPage />
    </div>
  );
};
