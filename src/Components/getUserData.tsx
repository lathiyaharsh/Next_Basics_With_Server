

const fetchUser = async () => {
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

      const data : any = await response.json();
      console.log("Fetched user data:", data);

      return data.user;
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };


  export default fetchUser;