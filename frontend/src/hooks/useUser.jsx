import { useState } from "react";
import { getUserById, updateUser, deleteUser } from "../services/userService";

export const useUser = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState();

  const userById = async (id_user, token) => {
    try {
      const response = await getUserById(id_user, token);
      if (!response.success) {
        setError(response.data.message);
      }
      console.log(response.message)
      setUser(response.data[0]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateU = async (userData, id_user, token) => {
    try {
      const response = await updateUser(userData, id_user, token);
      if (!response.success) {
        setError(response.data.message);
      }
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const removeUser = async (id_user, token) => {
    try {
      const response = await deleteUser(id_user, token);
      if (!response.success) {
        setError(response.data.message);
      }
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return { userById, updateU, removeUser, error, user };
};
