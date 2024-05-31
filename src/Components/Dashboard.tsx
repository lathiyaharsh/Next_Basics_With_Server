"use client";


import { AdminComponent, ManagerComponent, UserComponent } from '@/Components/RoleBasedComponents';

const Dashboard = () => {
  
  const role : any = 'user';

  if (!role) {
    return <p>Loading...</p>;
  }

  switch (role) {
    case 'admin':
      return <AdminComponent />;
    case 'manager':
      return <ManagerComponent />;
    case 'user':
      return <UserComponent />;
    default:
      return <p>Access denied</p>;
  }
};

export default Dashboard;
