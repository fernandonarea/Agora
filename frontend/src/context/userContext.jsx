import { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const id_user = localStorage.getItem("id_user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id_user, token);
        if (response) {
          setUser(response.data[0]);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id_user, token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, error, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);