import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const id_user = localStorage.getItem("id_user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!id_user || !token) return;

      try {
        const response = await getUserById(id_user, token);
        if (response.succes) {
          setUser(response.data[0]);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id_user, token]);

  //LOGOUT  
  const logout = () => {
    localStorage.removeItem("id_user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, error, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
