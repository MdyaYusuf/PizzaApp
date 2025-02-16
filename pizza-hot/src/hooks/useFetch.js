import { useCallback, useEffect, useState } from "react";

export default function useFetch(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async function sendRequest(data) {
    
    setIsLoading(true);
    
    try {
      const response = await fetch(url, { ...config, body: data });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Hata oluştu.");
      }

      setData(resData);
    } catch(error) {

      setError(error.message);
    }

    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest
  };
}