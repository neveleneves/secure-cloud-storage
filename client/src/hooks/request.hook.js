import { useState, useCallback } from "react";

export const useRequest = () => {
  const [error, setError] = useState(null);
  const [loadingProcess, setLoading] = useState(false);

  const ajaxRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setLoading(true);
        
        if(body) {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(body);
        }
        
        const response = await fetch(url, {
          method, 
          body, 
          headers
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Запрос был выполнен неверно");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e);
        throw e;
      }
    }, [])

    return {loadingProcess, ajaxRequest, error}
};
