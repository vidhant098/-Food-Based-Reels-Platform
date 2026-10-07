

import axios from "axios";
import { API_BASE_URL, getApiBaseUrl } from "../config/api";

const ORDER_API_BASE_URL =
  import.meta.env.VITE_ORDER_API_BASE_URL
    ? getApiBaseUrl(import.meta.env.VITE_ORDER_API_BASE_URL)
    : API_BASE_URL;

const placeOrder = async (foodId, quantity) => {
  const response = await axios.post(
    `${ORDER_API_BASE_URL}/api/order/placeOrder`,
    { foodId, quantity },
    { withCredentials: true }
  );

  return response.data;
};

export default placeOrder;
