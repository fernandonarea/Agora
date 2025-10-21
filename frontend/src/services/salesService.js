import axios from "axios";

export const createSale = async (customer_name, items, token) => {
  try {
    const response = await axios.post(
      `http://localhost:3200/api/sales/createSale`,
      {
        customer_name,
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Sale creation service error";
    throw new Error(message);
  }
};

export const getSales = async (token) => {
  try {
    const response = await axios.get("http://localhost:3200/api/sales", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Sales fetch service error";
    throw new Error(message);
  }
};

export const Metrics = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3200/api/sales/getMetrics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Sales fetch service error";
    throw new Error(message);
  }
};

export const Performance = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3200/api/sales/monthPerformance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Sales performance fetch service error";
    throw new Error(message);
  }
};

export const Statics = async (token) => {
  try {
    const response = await axios.get("http://localhost:3200/api/sales/kpi", {
      headers : {
        Authorization : `Bearer ${token}`
      },
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    const message =
      error.response?.data?.message || "Sales performance fetch service error";
    throw new Error(message);
  }
}
