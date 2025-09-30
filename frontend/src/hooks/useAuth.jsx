import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import { getUserById } from "@/services/userService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

const loginUser = async (user_email, password) => {
    setLoading(true);
    try {
      const response = await login(user_email, password);
      if (!response.success) {
        setError(response.data.message);
        setUser(null);
        return;
      }
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id_user", response.data.id_user);
      
      // Obtener datos completos del usuario
      const userData = await getUserById(response.data.id_user, response.data.token);
      if (userData.success) {
        setUser(userData.data[0]);
      }
      
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    user_name,
    user_lastname,
    role,
    user_email,
    password
  ) => {
    setLoading(true);
    try {
      const data = await register(
        user_name,
        user_lastname,
        role,
        user_email,
        password
      );
      setUser(data.data);
      return data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, loginUser, registerUser };
};
