import { useState, useCallback } from "react";
import axios from "axios";

/**
 * Custom hook for Axios requests (GET and POST).
 * @param {string} url - The URL to fetch or post data to.
 * @returns {object} - An object containing data, loading state, error state, and request functions.
 */
const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function for GET request
  const getData = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);

      // Construct URL with optional parameters
      const queryParams = new URLSearchParams(params).toString();
      const finalUrl = `${url}${queryParams ? `?${queryParams}` : ""}`;

      try {
        const response = await axios.get(finalUrl);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  // Function for POST request
  const postData = useCallback(
    async (postData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(url, postData);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return {
    data,
    loading,
    error,
    getData,
    postData,
  };
};

export default useAxios;
