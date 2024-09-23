import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Full URL to the backend profile endpoint
    axios.get('http://localhost:4040/profile', { withCredentials: true })
      .then(response => {
        setId(response.data.userId);
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
}
