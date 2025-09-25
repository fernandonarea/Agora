import axios from "axios";

export const login = async (user_email, password) => {
  try {
    const response = await axios.post("http://localhost:3200/api/users/login", {
      user_email,
      password,
    });
    localStorage.setItem("token", response.data.data.token);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Error en login";
    throw new Error(message);
  }
};

export const register = async (
  user_name,
  user_lastname,
  role,
  user_email,
  password
) => {
  try {
    const response = await axios.post(
      "http://localhost:3200/api/users/register",
      {
        user_name,
        user_lastname,
        role,
        user_email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.message;
  }
};
