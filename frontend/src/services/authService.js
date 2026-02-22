import axios from "axios";

export const login = async (user_email, password) => {
  try {
    const response = await axios.post("http://localhost:3200/api/users/login", {
      user_email,
      password,
    });
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("id_user", response.data.data.id_user)
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};

export const register = async (user_name, user_lastname, role, user_email, password, store_name, store_description, store_address, store_phone ) => {
  try {
    const response = await axios.post(
      "http://localhost:3200/api/users/register",
      { user_name, user_lastname, role, user_email, password, store_name, store_description, store_address, store_phone }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Ocurrió un error en el servidor";
  }
};