import axios from "axios";

export const getUserById = async (id_user, token) => {
  try {
    const response = await axios.get(
      `http://localhost:3200/api/users/getUserById/${id_user}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de usuarios";
    throw new Error(message);
  }
};

export const updateUser = async (userData, id_user, token) => {
  try {
    const response = await axios.put(`/${id_user}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de usuarios";
    throw new Error(message);
  }
};

export const deleteUser = async (id_user, token) => {
  try {
    const response = await axios.delete(`/${id_user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Error en el servicio de usuarios";
    throw new Error(message);
  }
};
