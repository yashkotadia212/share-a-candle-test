import { useCallback } from "react";
import axios from "axios";
import useAuthStore from "../zustand/authStore";

// Retrieving base URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAxiosAPI = () => {
  const { auth } = useAuthStore();

  const COMMON_HEADERS = {
    Authorization: `Bearer ${auth?.token}`,
    "Content-Type": "application/json",
  };

  const getData = useCallback(async (url, id, params) => {
    try {
      // Construct the base URL with optional ID
      let fullUrl = id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`;

      // Append the params object as a query string if provided
      if (params && typeof params === "object") {
        // Convert the params object to a query string
        const queryString = new URLSearchParams(params).toString();
        fullUrl = `${fullUrl}?${queryString}`;
      }

      // Make the GET request with the full URL
      const response = await axios.get(fullUrl, { headers: COMMON_HEADERS });

      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error with GET request:", error);
      throw error;
    }
  }, []);

  const postData = useCallback(async (url, data = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}${url}`, data, {
        headers: COMMON_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.error("Error with POST request:", error);
      throw error;
    }
  }, []);

  const putData = useCallback(async (url, data = {}) => {
    try {
      const response = await axios.put(`${BASE_URL}${url}`, data, {
        headers: COMMON_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.error("Error with PUT request:", error);
      throw error;
    }
  }, []);

  const deleteData = useCallback(async (url, id = "") => {
    try {
      const fullUrl = id ? `${BASE_URL}${url}/${id}` : `${BASE_URL}${url}`;
      const response = await axios.delete(fullUrl, {
        headers: COMMON_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.error("Error with DELETE request:", error);
      throw error;
    }
  }, []);

  return { getData, postData, putData, deleteData };
};

export default useAxiosAPI;
