"use client";
import React, { useContext } from "react";
import { ModelContext } from "./context/userContext"; 

function Home() {
  const [user, setUser] = useContext(ModelContext);
  return (
    <div>
      {/* Embed JavaScript expression to access user.userName */}
      <h1>Welcome, {user?.name || "Guest"} </h1>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;
