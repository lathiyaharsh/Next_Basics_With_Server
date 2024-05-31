import React from 'react'
import { useUserContext } from '../context/userContext';

function TestPage() {
    const [user] = useUserContext();
  return (
    <h1>{user?.name}</h1>
  )
}

export default TestPage